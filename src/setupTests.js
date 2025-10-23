// src/setupTests.js
import '@testing-library/jest-dom';

// 1. Mock de localStorage (Este se queda igual)
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
});

// 2. Mock de navigator.clipboard (LA CORRECCIÓN)
// jsdom crea un objeto 'navigator' (con 'userAgent').
// No lo sobrescribimos, solo le añadimos la propiedad 'clipboard'.

Object.defineProperty(globalThis.navigator, 'clipboard', {
  value: {
    writeText: () => Promise.resolve(),
    readText: () => Promise.resolve(''),
  },
  // Hacemos que la propiedad se pueda configurar
  configurable: true, 
  writable: true, 
});