import type { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'
// import authMock from "./mockRequest/auth";
// import orgAuthMock from "./mockRequest/orgAuth";

export default (httpClient: AxiosInstance) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mock = new MockAdapter(httpClient, {
    delayResponse: 1000,
    onNoMatch: 'passthrough'
  })

  // authMock(mock);
  // orgAuthMock(mock);
}
