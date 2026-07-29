import '@testing-library/jest-dom/vitest'

/**
 * jsdom não implementa matchMedia, e o projeto usa a API para decidir autoplay
 * e reduced-motion. O padrão aqui é "sem preferência declarada".
 */
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}
