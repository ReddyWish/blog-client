const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ============================================
// Error Class
// ============================================

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isServerError() {
    return this.status >= 500;
  }
}

// ============================================
// Types
// ============================================

type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
};

// ============================================
// Core Request Function
// ============================================

async function request<T>(
  method: string,
  url: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const { headers = {}, params, signal } = options;

  let fullUrl = `${API_BASE_URL}${url}`;
  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      fullUrl += `?${queryString}`;
    }
  }

  const requestHeaders: Record<string, string> = {};

  const isJsonBody = body !== undefined && !(body instanceof FormData);
  if (isJsonBody) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  Object.assign(requestHeaders, headers);

  const config: RequestInit = {
    method,
    credentials: 'include',
    signal,
    headers: requestHeaders,
    body: isJsonBody
      ? JSON.stringify(body)
      : body instanceof FormData
        ? body
        : undefined,
  };

  const response = await fetch(fullUrl, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || response.statusText,
      errorData,
    );
  }

  if (
    response.status === 204 ||
    response.headers.get('content-length') === '0'
  ) {
    return undefined as T;
  }

  return response.json();
}

// ============================================
// Public API
// ============================================

export const api = {
  get<T>(url: string, options?: RequestOptions) {
    return request<T>('GET', url, undefined, options);
  },

  post<T>(url: string, body?: unknown, options?: RequestOptions) {
    return request<T>('POST', url, body, options);
  },

  put<T>(url: string, body?: unknown, options?: RequestOptions) {
    return request<T>('PUT', url, body, options);
  },

  patch<T>(url: string, body?: unknown, options?: RequestOptions) {
    return request<T>('PATCH', url, body, options);
  },

  delete<T>(url: string, body?: unknown, options?: RequestOptions) {
    return request<T>('DELETE', url, body, options);
  },
};

export default api;
