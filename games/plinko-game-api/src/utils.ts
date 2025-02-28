const data = {
  serverURL: 'http://localhost:8080',
  token: 'not',
}
export const getBaseUrl = (): string => {
  const params = new URLSearchParams(window.location.search)
  return params.has('baseURL') ? String(params.get('baseURL')) : ''
}
export const isMock = (): boolean => {
  return data.token === 'not'
}
export const setServerUrl = (value: string) => {
  data.serverURL = value
}
export const setToken = (value: string) => {
  data.token = value
}
export const getServerUrl = (): string => {
  return data.serverURL
}
export const getToken = (): string => {
  return data.token
}
