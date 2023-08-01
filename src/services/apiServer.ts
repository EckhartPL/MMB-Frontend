import { ClientApiResponse } from '@backendTypes';

export const API_URL = import.meta.env.VITE_BACKEND_API;

interface ApiServerType {
  post<RequestBody, ResponseData>(
    endpoint: string,
    requestData: RequestBody,
    accessToken: string,
  ): Promise<ClientApiResponse<ResponseData>>;
  postFormData<ResponseData>(
    endpoint: string,
    requestData: FormData,
    accessToken: string,
  ): Promise<ClientApiResponse<ResponseData>>;
  get<ResponseData>(endpoint: string, accessToken: string): Promise<ClientApiResponse<ResponseData>>;
  patch<RequestBody, ResponseData>(
    endpoint: string,
    requestData: RequestBody,
    accessToken: string,
  ): Promise<ClientApiResponse<ResponseData>>;
}

class ApiServer implements ApiServerType {
  constructor(private readonly apiUrl: string) {}

  async post<RequestBody, ResponseData>(
    endpoint: string,
    requestData?: RequestBody,
    accessToken?: string | null,
  ): Promise<ClientApiResponse<ResponseData>> {
    let init: RequestInit;
    if (requestData) {
      init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(requestData),
      };
    } else {
      init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      };
    }

    return this.handleFetch<ResponseData>(this.getUrl(endpoint), init);
  }

  async postFormData<ResponseData>(
    endpoint: string,
    requestData: FormData,
    accessToken: string,
  ): Promise<ClientApiResponse<ResponseData>> {
    const init: RequestInit = {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: requestData,
    };

    return this.handleFetch<ResponseData>(this.getUrl(endpoint), init);
  }

  async get<ResponseData>(endpoint: string, accessToken?: string): Promise<ClientApiResponse<ResponseData>> {
    return this.handleFetch<ResponseData>(this.getUrl(endpoint), {
      method: 'GET',
      credentials: 'include',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  async patch<RequestBody, ResponseData>(
    endpoint: string,
    requestData: RequestBody,
    accessToken?: string,
  ): Promise<ClientApiResponse<ResponseData>> {
    const init: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestData),
    };

    return this.handleFetch<ResponseData>(this.getUrl(endpoint), init);
  }

  private getUrl(endpoint: string): string {
    return this.apiUrl + endpoint;
  }

  private async handleFetch<ResponseData>(
    request: RequestInfo,
    init?: RequestInit,
  ): Promise<ClientApiResponse<ResponseData>> {
    try {
      const response = await fetch(request, init);
      return await response.json();
    } catch (error) {
      console.log(request, init);
      console.error(error);
      throw new Error('Internal server error while handling fetch.');
    }
  }
}

export const apiServer = new ApiServer(API_URL);
