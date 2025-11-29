import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  const auth = localStorage.getItem("auth");
  const headers: HeadersInit = data ? { "Content-Type": "application/json" } : {};
  
  if (auth) {
    const authData = JSON.parse(auth);
    if (authData.token) {
      headers["Authorization"] = `Bearer ${authData.token}`;
    }
  }

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || res.statusText);
  return json;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    let url = queryKey[0] as string;
    
    // Handle query parameters from remaining array elements
    if (queryKey.length > 1) {
      const params = new URLSearchParams();
      for (let i = 1; i < queryKey.length; i++) {
        const param = queryKey[i];
        if (typeof param === 'object' && param !== null) {
          Object.entries(param).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              params.append(key, String(value));
            }
          });
        }
      }
      const queryString = params.toString();
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }
    
    const auth = localStorage.getItem("auth");
    const headers: HeadersInit = {};
    
    if (auth) {
      const authData = JSON.parse(auth);
      if (authData.token) {
        headers["Authorization"] = `Bearer ${authData.token}`;
      }
    }
    
    const res = await fetch(url, {
      headers,
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
