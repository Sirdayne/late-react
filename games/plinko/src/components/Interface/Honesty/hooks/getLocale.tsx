export const getLocale = () => {
  const params = new URLSearchParams(window.location.search)
  return (params.get('lang') || navigator.languages?.[0] || navigator.language).split(/-|_/)[0] || 'en'
}
