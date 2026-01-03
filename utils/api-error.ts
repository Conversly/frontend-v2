import { isAxiosError } from "axios";

/**
 * Standardized error message extraction
 * Handles Axios errors, Error objects, and strings
 */
export const getErrorMessage = (error: unknown): string => {
    if (typeof error === "string") {
        return error;
    }

    if (isAxiosError(error)) {
        // Check for specific backend error format
        if (error.response?.data?.message) {
            return error.response.data.message;
        }
        // Check for validation errors array
        if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
            return error.response.data.errors.join(", ");
        }
        if (error.message) {
            return error.message;
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "An unexpected error occurred";
};
