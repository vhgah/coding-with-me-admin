const apiURL = import.meta.env.VITE_API_URL

interface ApiConfigInterface {
  baseURL: string;
  timeout: number;
}

export const apiConfig: ApiConfigInterface = {
  baseURL: apiURL,
  timeout: 15 * 1000
}