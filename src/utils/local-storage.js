export function saveLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
}

export function fetchLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function removeLocalStorage(key) {
    localStorage.removeItem(key);
}

export function saveSession(user) {
    localStorage.setItem('hilton-session', JSON.stringify(user));
}

export function getSession() {
    return JSON.parse(localStorage.getItem('hilton-session'));
}