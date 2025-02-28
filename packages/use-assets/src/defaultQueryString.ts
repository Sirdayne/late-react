import * as PIXI from 'pixi.js'

let defaultQueryString = ''

//hack для добавления query params в загрузку atlas и images для spine анимации
const originalFetch = window.fetch
window.fetch = (...args) => {
  const [resource, config] = args
  let queryString = resource
  if (typeof resource === 'string' && !/data:*.?/.test(resource)) {
    const url = PIXI.utils.url.parse(resource)
    if (url.query !== null && !url.query.includes(defaultQueryString)) {
      queryString = url.href + '?' + (url.query ? url.query + '&' + defaultQueryString : defaultQueryString)
    }
  }
  return originalFetch(queryString, config)
}
PIXI.settings.ADAPTER.fetch = window.fetch

export default {
  get(): string {
    return defaultQueryString
  },
  async set(value: string) {
    defaultQueryString = value

    await PIXI.Assets.init({
      defaultSearchParams: defaultQueryString,
      preferences: {
        preferWorkers: false,
      },
    })
  },
}
