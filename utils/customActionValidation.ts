import { z } from "zod";
import type { CustomAction, ToolParameter } from "@/types/customActions";

export type ActionFormErrors = Record<string, string>;
export type ActionFormTab =
  | "behavior"
  | "inputs"
  | "connection"
  | "test-output";

type ValidationResult =
  | { ok: true; errors: ActionFormErrors; tab: null }
  | { ok: false; errors: ActionFormErrors; tab: ActionFormTab };

const actionNameSchema = z
  .string()
  .trim()
  .min(3, "Action name must be at least 3 characters.")
  .regex(/^[a-z0-9_]+$/, "Action name must be lowercase letters, numbers, underscores.");

const descriptionSchema = z
  .string()
  .trim()
  .min(20, "Description must be at least 20 characters.");

const apiConfigSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  baseUrl: z.string().trim().min(1, "Base URL is required.").url("Base URL must be a valid URL."),
  endpoint: z
    .string()
    .trim()
    .min(1, "Endpoint is required.")
    .refine((s) => s.startsWith("/"), "Endpoint must start with '/'."),
  authType: z.enum(["none", "bearer", "api_key", "basic"]).optional(),
  authValue: z.string().optional(),
});

const toolParamSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Parameter name is required.")
      .regex(/^[a-z0-9_]+$/, "Parameter name must be lowercase letters, numbers, underscores."),
    type: z.enum(["string", "number", "integer", "boolean", "array", "object"]),
    description: z.string().optional().default(""),
    required: z.boolean(),
    location: z.enum(["path", "query", "header", "body"]),
    key: z.string().optional(),
    bodyPath: z.string().optional(),
    default: z.any().optional(),
    source: z.enum(["user", "contact", "fixed"]).optional().default("user"),
    contactField: z.string().optional(),
    enum: z.array(z.string()).optional(),
    pattern: z.string().optional(),
    minimum: z.number().optional(),
    maximum: z.number().optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    items: z.object({ type: z.enum(["string", "number", "integer", "boolean", "array", "object"]) }).optional(),
    properties: z
      .record(
        z.string(),
        z.object({
          type: z.enum(["string", "number", "integer", "boolean", "array", "object"]),
          description: z.string().optional(),
        })
      )
      .optional(),
  })
  .superRefine((p, ctx) => {
    if ((p.source ?? "user") === "user" && (p.description ?? "").trim().length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parameter description must be at least 10 characters.",
        path: ["description"],
      });
    }
    if (p.source === "contact") {
      if (!(p.contactField ?? "").trim().length || p.contactField === "metadata.") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Contact field is required when source is 'contact'.",
          path: ["contactField"],
        });
      }
    }
    if (p.source === "fixed") {
      if (p.default === undefined || p.default === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Default value is required when source is 'fixed'.",
          path: ["default"],
        });
      }
    }
    if ((p.location === "query" || p.location === "header") && !((p.key ?? p.name ?? "").trim().length)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Key is required for ${p.location} parameter.`,
        path: ["key"],
      });
    }
    if (p.location === "body" && !((p.bodyPath ?? "").trim().length)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Body path is required for body parameter.",
        path: ["bodyPath"],
      });
    }
  });

function pickTab(errors: ActionFormErrors): ActionFormTab {
  const keys = Object.keys(errors);
  if (
    keys.some(
      (k) =>
        k === "name" ||
        k === "description" ||
        k.startsWith("triggerExamples") ||
        k === "accessLevel" ||
        k.startsWith("requiredContactFields"),
    )
  ) {
    return "behavior";
  }
  if (
    keys.some(
      (k) =>
        k.startsWith("testArgs.") ||
        k === "responseMapping" ||
        k === "apiConfig.responseMapping",
    )
  ) {
    return "test-output";
  }
  if (keys.some((k) => k.startsWith("apiConfig."))) return "connection";
  if (keys.some((k) => k.startsWith("parameters."))) return "inputs";
  return "test-output";
}

function addZodIssues(out: ActionFormErrors, prefix: string, issues: z.ZodIssue[]) {
  for (const i of issues) {
    const p = [prefix, ...i.path.map(String)].filter(Boolean).join(".");
    // Prefer first message for a field (less noisy).
    if (!out[p]) out[p] = i.message;
  }
}

function validateCore(action: CustomAction): ActionFormErrors {
  const errors: ActionFormErrors = {};

  const nameRes = actionNameSchema.safeParse(action.name);
  if (!nameRes.success) errors.name = nameRes.error.issues[0]?.message ?? "Invalid action name.";

  const descRes = descriptionSchema.safeParse(action.description);
  if (!descRes.success) errors.description = descRes.error.issues[0]?.message ?? "Invalid description.";

  const apiRes = apiConfigSchema.safeParse(action.apiConfig);
  if (!apiRes.success) addZodIssues(errors, "apiConfig", apiRes.error.issues);

  // Auth: if authType != none, authValue is required.
  const authType = action.apiConfig.authType ?? "none";
  if (authType !== "none" && !((action.apiConfig.authValue ?? "").trim().length)) {
    errors["apiConfig.authValue"] = "Auth value is required for the selected auth type.";
  }

  // Parameters: validate + enforce unique names.
  const seen = new Map<string, number>();
  action.parameters.forEach((p, idx) => {
    const res = toolParamSchema.safeParse(p);
    if (!res.success) addZodIssues(errors, `parameters.${idx}`, res.error.issues);

    const name = (p.name ?? "").trim();
    if (!name) return;
    const prev = seen.get(name);
    if (prev !== undefined) {
      errors[`parameters.${idx}.name`] = "Duplicate parameter name.";
      errors[`parameters.${prev}.name`] = "Duplicate parameter name.";
    } else {
      seen.set(name, idx);
    }
  });

  return errors;
}

export function validateActionForTest(
  action: CustomAction,
  testValues: Record<string, string>
): ValidationResult {
  const errors = validateCore(action);

  // Required params must have a test value (or a default).
  // Contact-sourced params are optional for testing (auto-injected at runtime).
  for (const p of action.parameters) {
    if (!p.required || p.source === 'contact' || p.source === 'fixed') continue;
    const raw = (testValues?.[p.name] ?? "").toString().trim();
    const hasDefault = p.default !== undefined && p.default !== "";
    if (!raw.length && !hasDefault) {
      errors[`testArgs.${p.name}`] = "Required for testing.";
    }
  }

  if (Object.keys(errors).length) return { ok: false, errors, tab: pickTab(errors) };
  return { ok: true, errors: {}, tab: null };
}

export function validateActionForDraft(action: CustomAction): ValidationResult {
  const errors: ActionFormErrors = {};

  const nameRes = actionNameSchema.safeParse(action.name);
  if (!nameRes.success) errors.name = nameRes.error.issues[0]?.message ?? "Invalid action name.";

  const descRes = descriptionSchema.safeParse(action.description);
  if (!descRes.success) errors.description = descRes.error.issues[0]?.message ?? "Invalid description.";

  if (Object.keys(errors).length) return { ok: false, errors, tab: "behavior" };
  return { ok: true, errors: {}, tab: null };
}

export function validateActionForSave(action: CustomAction): ValidationResult {
  const errors = validateCore(action);
  if (Object.keys(errors).length) return { ok: false, errors, tab: pickTab(errors) };
  return { ok: true, errors: {}, tab: null };
}

export function formatValidationErrors(errors: ActionFormErrors, max = 4): string {
  const msgs = Object.values(errors).filter(Boolean);
  if (msgs.length === 0) return "";
  const unique = Array.from(new Set(msgs));
  const head = unique.slice(0, max);
  const rest = unique.length - head.length;
  return rest > 0 ? `${head.join(" • ")} • +${rest} more` : head.join(" • ");
}
