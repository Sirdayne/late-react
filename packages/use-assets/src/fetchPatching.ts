const { fetch: originalFetch } = window
window.fetch = (...args) => {
  const [resource, config] = args
  return originalFetch(resource, config)
}
const originalOpen = XMLHttpRequest.prototype.open
XMLHttpRequest.prototype.open = function () {
  // eslint-disable-next-line prefer-rest-params
  //@ts-ignore
  return originalOpen.apply(this, arguments)
}
