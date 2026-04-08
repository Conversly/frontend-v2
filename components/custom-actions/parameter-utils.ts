import type { ApiConfig, ParamType, ToolParameter } from '@/types/customActions';

export const CONTACT_FIELD_OPTIONS = [
  { value: 'externalId', label: 'User ID' },
  { value: 'email', label: 'Email' },
  { value: 'name', label: 'Name' },
  { value: 'phone', label: 'Phone' },
  { value: 'id', label: 'Internal Contact ID' },
  { value: 'metadata.', label: 'Metadata field' },
] as const;

type ImportedBinding =
  | {
      location: 'path';
      token: string;
      name: string;
      type: ParamType;
      description: string;
      required: true;
      source: 'user';
    }
  | {
      location: 'query';
      key: string;
      name: string;
      type: ParamType;
      description: string;
      required: true;
      source: 'user';
    }
  | {
      location: 'body';
      bodyPath: string;
      name: string;
      type: ParamType;
      description: string;
      required: true;
      source: 'user';
    };

function toSnakeCase(value: string): string {
  const normalized = value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_')
    .toLowerCase();

  if (!normalized.length) return '';
  if (/^[a-z]/.test(normalized)) return normalized;
  return `field_${normalized}`;
}

export function extractPathParams(endpoint: string): string[] {
  const found: string[] = [];
  const curly = endpoint.match(/\{([^}]+)\}/g) || [];
  for (const match of curly) {
    const name = match.replace(/[{}]/g, '').trim();
    if (name) found.push(name);
  }
  const colon = endpoint.match(/:([A-Za-z0-9_]+)/g) || [];
  for (const match of colon) {
    const name = match.slice(1).trim();
    if (name) found.push(name);
  }
  return [...new Set(found)];
}

export function listDotPaths(value: any, prefix = '', out: string[] = [], depth = 0): string[] {
  if (depth > 6 || !value || typeof value !== 'object' || Array.isArray(value)) return out;

  for (const key of Object.keys(value)) {
    const next = prefix ? `${prefix}.${key}` : key;
    out.push(next);
    listDotPaths(value[key], next, out, depth + 1);
    if (out.length > 250) return out;
  }
  return out;
}

export function extractLegacyVariables(str: string): string[] {
  const matches = str.match(/\{\{([^}]+)\}\}/g) || [];
  return [...new Set(matches.map((m) => m.replace(/\{\{|\}\}/g, '').trim()).filter(Boolean))];
}

export function extractExactTemplateVar(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const match = value.trim().match(/^\{\{([^}]+)\}\}$/);
  if (!match) return null;
  const name = (match[1] || '').trim();
  return name.length ? name : null;
}

export function collectBodyTemplateBindings(
  value: any,
  prefix = '',
  out: Array<{ name: string; bodyPath: string }> = []
): Array<{ name: string; bodyPath: string }> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return out;

  for (const key of Object.keys(value)) {
    const nextPath = prefix ? `${prefix}.${key}` : key;
    const child = value[key];
    const exact = extractExactTemplateVar(child);
    if (exact) {
      out.push({ name: exact, bodyPath: nextPath });
    } else if (child && typeof child === 'object' && !Array.isArray(child)) {
      collectBodyTemplateBindings(child, nextPath, out);
    }
    if (out.length > 250) return out;
  }
  return out;
}

function inferParamType(value: unknown): ParamType {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === 'true' || trimmed === 'false') return 'boolean';
    if (/^-?\d+$/.test(trimmed)) return 'integer';
    if (/^-?\d+\.\d+$/.test(trimmed)) return 'number';
    return 'string';
  }
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'number';
  return 'string';
}

function isScalarLeaf(value: unknown): value is string | number | boolean | null {
  return value === null || ['string', 'number', 'boolean'].includes(typeof value);
}

function collectScalarBodyLeaves(
  value: any,
  prefix = '',
  out: Array<{ bodyPath: string; key: string; value: string | number | boolean | null }> = []
): Array<{ bodyPath: string; key: string; value: string | number | boolean | null }> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return out;

  for (const key of Object.keys(value)) {
    const nextPath = prefix ? `${prefix}.${key}` : key;
    const child = value[key];
    if (isScalarLeaf(child)) {
      out.push({ bodyPath: nextPath, key, value: child });
    } else if (child && typeof child === 'object' && !Array.isArray(child)) {
      collectScalarBodyLeaves(child, nextPath, out);
    }
    if (out.length > 250) return out;
  }

  return out;
}

function cloneJson<T>(value: T): T {
  if (value === undefined) return value;
  return JSON.parse(JSON.stringify(value));
}

function removeBodyPaths(staticBody: any, bodyPaths: string[]): any {
  if (!staticBody || typeof staticBody !== 'object' || Array.isArray(staticBody) || bodyPaths.length === 0) {
    return staticBody;
  }

  const next = cloneJson(staticBody);

  for (const bodyPath of bodyPaths) {
    const parts = bodyPath.split('.').filter(Boolean);
    if (!parts.length) continue;

    let current = next;
    for (let i = 0; i < parts.length - 1; i += 1) {
      const part = parts[i];
      if (!current || typeof current !== 'object' || Array.isArray(current)) break;
      current = current[part];
    }

    if (current && typeof current === 'object' && !Array.isArray(current)) {
      delete current[parts[parts.length - 1]];
    }
  }

  return next;
}

function buildUniqueImportedName(
  preferred: string,
  fallbackPath: string,
  usedNames: Set<string>
): string {
  const base = toSnakeCase(preferred) || toSnakeCase(fallbackPath) || 'input_value';
  if (!usedNames.has(base)) {
    usedNames.add(base);
    return base;
  }

  const fallback = toSnakeCase(fallbackPath) || base;
  if (!usedNames.has(fallback)) {
    usedNames.add(fallback);
    return fallback;
  }

  let suffix = 2;
  while (usedNames.has(`${fallback}_${suffix}`)) suffix += 1;
  const next = `${fallback}_${suffix}`;
  usedNames.add(next);
  return next;
}

function describeImportedField(location: ImportedBinding['location'], key: string): string {
  const label = key.replace(/_/g, ' ');
  switch (location) {
    case 'path':
      return `Value for the ${label} path segment.`;
    case 'query':
      return `Value for the ${label} query parameter.`;
    case 'body':
      return `Value for the ${label} field in the request body.`;
  }
}

function createImportedBindings(config: Partial<ApiConfig>, existing: ToolParameter[]): ImportedBinding[] {
  const usedNames = new Set(existing.map((param) => param.name).filter(Boolean));
  const endpoint = config.endpoint || '';
  const queryIndex = endpoint.indexOf('?');
  const pathOnly = queryIndex === -1 ? endpoint : endpoint.slice(0, queryIndex);
  const search = queryIndex === -1 ? '' : endpoint.slice(queryIndex + 1);

  const bindings: ImportedBinding[] = [];

  for (const token of extractPathParams(pathOnly)) {
    const name = buildUniqueImportedName(token, token, usedNames);
    bindings.push({
      location: 'path',
      token,
      name,
      type: 'string',
      description: describeImportedField('path', token),
      required: true,
      source: 'user',
    });
  }

  const searchParams = new URLSearchParams(search);
  const queryKeys = new Set<string>();
  for (const [key, rawValue] of searchParams.entries()) {
    if (!key.trim() || queryKeys.has(key)) continue;
    queryKeys.add(key);
    const name = buildUniqueImportedName(key, `query_${key}`, usedNames);
    bindings.push({
      location: 'query',
      key,
      name,
      type: inferParamType(rawValue),
      description: describeImportedField('query', key),
      required: true,
      source: 'user',
    });
  }

  const bodyLeaves = collectScalarBodyLeaves(config.staticBody);
  for (const leaf of bodyLeaves) {
    const name = buildUniqueImportedName(leaf.key, leaf.bodyPath.replace(/\./g, '_'), usedNames);
    bindings.push({
      location: 'body',
      bodyPath: leaf.bodyPath,
      name,
      type: inferParamType(leaf.value),
      description: describeImportedField('body', leaf.bodyPath),
      required: true,
      source: 'user',
    });
  }

  return bindings;
}

function bindingKey(param: Pick<ToolParameter, 'location' | 'name' | 'key' | 'bodyPath'>): string {
  if (param.location === 'body') return `body:${param.bodyPath || param.name}`;
  if (param.location === 'query' || param.location === 'header') return `${param.location}:${param.key || param.name}`;
  return `${param.location}:${param.name}`;
}

function mergeImportedParameter(existing: ToolParameter, imported: ToolParameter): ToolParameter {
  return {
    ...existing,
    name: existing.name || imported.name,
    type: existing.type || imported.type,
    description: existing.description?.trim().length ? existing.description : imported.description,
    required: existing.required ?? imported.required,
    location: existing.location || imported.location,
    key:
      existing.key?.trim().length || imported.location !== 'query'
        ? existing.key
        : imported.key,
    bodyPath:
      existing.bodyPath?.trim().length || imported.location !== 'body'
        ? existing.bodyPath
        : imported.bodyPath,
    source: existing.source ?? imported.source,
  };
}

export function synthesizeParametersFromImportedConfig(
  importedConfig: Partial<ApiConfig>,
  existingParameters: ToolParameter[]
): { apiConfig: Partial<ApiConfig>; parameters: ToolParameter[] } {
  const importedBindings = createImportedBindings(importedConfig, existingParameters);
  const normalizedEndpoint = (importedConfig.endpoint || '').split('?')[0] || importedConfig.endpoint;
  const bodyPathsToRemove = importedBindings
    .filter((binding): binding is Extract<ImportedBinding, { location: 'body' }> => binding.location === 'body')
    .map((binding) => binding.bodyPath);

  const normalizedConfig: Partial<ApiConfig> = {
    ...importedConfig,
    endpoint: normalizedEndpoint,
    staticBody: removeBodyPaths(importedConfig.staticBody, bodyPathsToRemove),
  };

  const nextParameters = [...existingParameters];
  const indexByBinding = new Map(nextParameters.map((param, index) => [bindingKey(param), index] as const));
  const indexByName = new Map(nextParameters.map((param, index) => [param.name, index] as const));

  for (const binding of importedBindings) {
    const importedParam: ToolParameter =
      binding.location === 'body'
        ? {
            name: binding.name,
            type: binding.type,
            description: binding.description,
            required: binding.required,
            location: 'body',
            bodyPath: binding.bodyPath,
            source: binding.source,
          }
        : binding.location === 'query'
          ? {
              name: binding.name,
              type: binding.type,
              description: binding.description,
              required: binding.required,
              location: 'query',
              key: binding.key,
              source: binding.source,
            }
          : {
              name: binding.name,
              type: binding.type,
              description: binding.description,
              required: binding.required,
              location: 'path',
              source: binding.source,
            };

    const importedKey = bindingKey(importedParam);
    const byBinding = indexByBinding.get(importedKey);
    const byName = indexByName.get(importedParam.name);
    const targetIndex = byBinding ?? byName;

    if (targetIndex === undefined) {
      nextParameters.push(importedParam);
      indexByBinding.set(importedKey, nextParameters.length - 1);
      indexByName.set(importedParam.name, nextParameters.length - 1);
      continue;
    }

    const merged = mergeImportedParameter(nextParameters[targetIndex], importedParam);
    nextParameters[targetIndex] = merged;
    indexByBinding.set(bindingKey(merged), targetIndex);
    indexByName.set(merged.name, targetIndex);
  }

  return {
    apiConfig: normalizedConfig,
    parameters: nextParameters,
  };
}

export function formatBindingSummary(param: Pick<ToolParameter, 'location' | 'name' | 'key' | 'bodyPath'>): string {
  switch (param.location) {
    case 'path':
      return `path.${param.name || 'value'}`;
    case 'query':
      return `query.${param.key || param.name || 'value'}`;
    case 'header':
      return `header.${param.key || param.name || 'value'}`;
    case 'body':
      return `body.${param.bodyPath || param.name || 'value'}`;
    default:
      return 'unbound';
  }
}
