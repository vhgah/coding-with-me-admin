const appUrl = import.meta.env.VITE_API_URL

interface ApiConfigInterface {
  baseUrl: string;
  timeout: number;
}

export const apiConfig: ApiConfigInterface = {
  baseUrl: appUrl,
  timeout: 15 * 1000
}