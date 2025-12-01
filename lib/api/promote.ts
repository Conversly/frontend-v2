import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import { ProductLaunchData, Comment, CreateProductLaunchInput, UpdateProductLaunchInput } from "@/types/promote";

export const getProducts = async (): Promise<ProductLaunchData[]> => {
    const res = await fetch(
        API.ENDPOINTS.PROMOTE.BASE_URL() + API.ENDPOINTS.PROMOTE.GET_PRODUCTS(),
        {
            method: "GET",
        }
    ).then((res) => res.data) as ApiResponse<ProductLaunchData[], Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const getMyProducts = async (): Promise<ProductLaunchData[]> => {
    const res = await fetch(
        API.ENDPOINTS.PROMOTE.BASE_URL() + API.ENDPOINTS.PROMOTE.MY_PRODUCTS(),
        {
            method: "GET",
        }
    ).then((res) => res.data) as ApiResponse<ProductLaunchData[], Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const getProduct = async (id: string): Promise<ProductLaunchData> => {
    const endpoint = API.ENDPOINTS.PROMOTE.GET_PRODUCT().replace(":id", id);
    const res = await fetch(
        API.ENDPOINTS.PROMOTE.BASE_URL() + endpoint,
        {
            method: "GET",
        }
    ).then((res) => res.data) as ApiResponse<ProductLaunchData, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const createProduct = async (data: CreateProductLaunchInput): Promise<ProductLaunchData> => {
    const res = await fetch(
        API.ENDPOINTS.PROMOTE.BASE_URL() + API.ENDPOINTS.PROMOTE.CREATE_PRODUCT(),
        {
            method: "POST",
            data,
        }
    ).then((res) => res.data) as ApiResponse<ProductLaunchData, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const updateProduct = async (id: string, data: UpdateProductLaunchInput): Promise<ProductLaunchData> => {
    const endpoint = API.ENDPOINTS.PROMOTE.UPDATE_PRODUCT().replace(":id", id);
    const res = await fetch(
        API.ENDPOINTS.PROMOTE.BASE_URL() + endpoint,
        {
            method: "PUT",
            data,
        }
    ).then((res) => res.data) as ApiResponse<ProductLaunchData, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const upvoteProduct = async (id: string): Promise<{ likesCount: number }> => {
    const endpoint = API.ENDPOINTS.PROMOTE.UPVOTE_PRODUCT().replace(":id", id);
    const res = await fetch(
        API.ENDPOINTS.PROMOTE.BASE_URL() + endpoint,
        {
            method: "POST",
        }
    ).then((res) => res.data) as ApiResponse<{ likesCount: number }, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const addComment = async (id: string, data: { content: string; author: Comment['author'] }): Promise<Comment> => {
    const endpoint = API.ENDPOINTS.PROMOTE.ADD_COMMENT().replace(":id", id);
    const res = await fetch(
        API.ENDPOINTS.PROMOTE.BASE_URL() + endpoint,
        {
            method: "POST",
            data,
        }
    ).then((res) => res.data) as ApiResponse<Comment, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const replyToComment = async (id: string, commentId: string, data: { content: string; author: Comment['author'] }): Promise<Comment> => {
    const endpoint = API.ENDPOINTS.PROMOTE.REPLY_COMMENT()
        .replace(":id", id)
        .replace(":commentId", commentId);
    const res = await fetch(
        API.ENDPOINTS.PROMOTE.BASE_URL() + endpoint,
        {
            method: "POST",
            data,
        }
    ).then((res) => res.data) as ApiResponse<Comment, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const upvoteComment = async (id: string, commentId: string): Promise<{ upvotes: number }> => {
    const endpoint = API.ENDPOINTS.PROMOTE.UPVOTE_COMMENT()
        .replace(":id", id)
        .replace(":commentId", commentId);
    const res = await fetch(
        API.ENDPOINTS.PROMOTE.BASE_URL() + endpoint,
        {
            method: "POST",
        }
    ).then((res) => res.data) as ApiResponse<{ upvotes: number }, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const uploadFile = async (file: File): Promise<{ url: string; pathname: string; contentType: string; contentDisposition: string }> => {
    // File upload is special, might need FormData or raw body depending on backend
    // User said: "Binary File Upload... Extracts filename from query parameter... Body is the file itself"

    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${file.name}`;
    const endpoint = `${API.ENDPOINTS.PROMOTE.BASE_URL()}${API.ENDPOINTS.PROMOTE.UPLOAD()}?filename=${encodeURIComponent(uniqueFilename)}`;

    // We need to bypass the default axios wrapper if it forces JSON, or configure it to handle binary
    // But let's try using the wrapper first, or use fetch directly if needed.
    // The existing axios wrapper might set Content-Type to application/json.
    // Let's check axios.ts.

    // For now, I'll use the axios instance but override headers.
    const res = await fetch(endpoint, {
        method: "POST",
        data: file,
        headers: {
            "Content-Type": file.type,
        }
    }).then((res) => res.data);

    // Handle Vercel Blob direct response (no success wrapper)
    // The backend might return the blob object directly: { url: "...", pathname: "...", ... }
    if ((res as any).url && (res as any).pathname) {
        return res as any;
    }

    // Handle standard ApiResponse
    const apiRes = res as ApiResponse<{ url: string; pathname: string; contentType: string; contentDisposition: string }, Error>;

    if (!apiRes.success) {
        throw new Error(apiRes.message || "Upload failed");
    }

    return apiRes.data;
};
