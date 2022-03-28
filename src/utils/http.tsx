import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

interface NuvoRequestConfig extends AxiosRequestConfig {
  includeSNAuth?: boolean;
}

interface SNWindowContext extends Window {
  g_ck?: string;
}

const TABLE_API = "/api/now/table";
const client = ((): AxiosInstance => {
  const _client = axios.create({
    headers: { "Content-Type": "application/json" },
  });

  function _isHandlerEnabled(config: NuvoRequestConfig = {}) {
    const { includeSNAuth } = config;
    return includeSNAuth !== false;
  }

  const _requestHandler = (request: NuvoRequestConfig) => {
    if (_isHandlerEnabled(request)) {
      request.headers["X-UserToken"] = (window as SNWindowContext).g_ck;
    }
    return request;
  };

  _client.interceptors.request.use((request) => _requestHandler(request));
  return _client;
})();

async function get(endpoint: string, config: NuvoRequestConfig = {}) {
  return await client.get(endpoint, config);
}

async function post(
  endpoint: string,
  data: any = {},
  config: NuvoRequestConfig = {}
) {
  return await client.post(endpoint, data, config);
}

async function put(
  endpoint: string,
  data: any = {},
  config: NuvoRequestConfig = {}
) {
  return await client.put(endpoint, data, config);
}

async function del(endpoint: string, config: NuvoRequestConfig = {}) {
  return await client.delete(endpoint, config);
}

function _extractArrayResult(resp: AxiosResponse): any[] {
  return resp ? resp.data.result : [];
}

function _extractObjectResult(resp: AxiosResponse): any {
  return resp ? resp.data.result : {};
}

function _getRecordsEndpoint(tableNameOrRestEndpoint: string) {
  const t = tableNameOrRestEndpoint;
  const isRestApi = t.indexOf("/") > -1;
  return isRestApi ? tableNameOrRestEndpoint : `${TABLE_API}/${t}`;
}

async function getRecords(
  tableNameOrRestEndpoint: string,
  params: any = {}
): Promise<any[]> {
  const { sysparm_query, query, ...request } = params;
  const q = sysparm_query || query;
  if (q) {
    request.sysparm_query = q;
  }
  const endpoint = _getRecordsEndpoint(tableNameOrRestEndpoint);
  const resp: AxiosResponse<any> = await get(endpoint, {
    params: request,
  });

  return _extractArrayResult(resp);
}

async function getRecord(
  tableName: string,
  sysId: string,
  params: any
): Promise<any> {
  const endpoint = `${TABLE_API}/${tableName}/${sysId}`;
  const resp: AxiosResponse<any> = await get(endpoint, {
    params,
  });
  return _extractObjectResult(resp);
}

async function createRecord(
  tableName: string,
  data: any,
  params: any
): Promise<any> {
  const endpoint = `${TABLE_API}/${tableName}`;
  const resp: AxiosResponse<any> = await post(endpoint, data, {
    params,
  });
  return _extractObjectResult(resp);
}

async function updateRecords(
  tableNameOrRestEndpoint: string,
  data: any,
  params: any = {}
): Promise<any[]> {
  const { sysparm_query, query, ...request } = params;
  const q = sysparm_query || query;
  if (q) {
    request.sysparm_query = q;
  }
  const endpoint = _getRecordsEndpoint(tableNameOrRestEndpoint);
  const resp: AxiosResponse<any> = await put(endpoint, data, {
    params: request,
  });
  return _extractArrayResult(resp);
}

async function updateRecord(
  tableName: string,
  sysId: string,
  data: any,
  params: any
): Promise<any> {
  const endpoint = `${TABLE_API}/${tableName}/${sysId}`;
  const resp: AxiosResponse<any> = await put(endpoint, data, {
    params,
  });
  return _extractObjectResult(resp);
}

async function deleteRecord(
  tableName: string,
  sysId: string,
  params: any
): Promise<void> {
  const endpoint = `${TABLE_API}/${tableName}/${sysId}`;
  const resp: AxiosResponse<any> = await del(endpoint, {
    params,
  });
}

export {
  client,
  get,
  post,
  put,
  del,
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  updateRecords,
  deleteRecord,
};
