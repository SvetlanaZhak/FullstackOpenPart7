import 'jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

let savedItems = {}

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item;
        console.log(savedItems[key]);
    },
    getItem: (key) => {

        return savedItems[key];
    },
    clear: () => {
        savedItems = {}
    }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })