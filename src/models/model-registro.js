import { saveLocalStorage, fetchLocalStorage, removeLocalStorage } from '../utils/local-storage.js';

export function getUsers() {
    return fetchLocalStorage('hilton-users') || [];
}

export function saveUser(userData) {
    const users = getUsers();
    users.push(userData);

    saveLocalStorage('hilton-users', users);
    return userData;
}

export function removeUsers() {
    removeLocalStorage('hilton-users');


export function removeUsers() {
    removeLocalStorage('hilton-users');
}


export function deleteUser(email){
    const users = getUsers()
    const updateUsers = users.filter(user => user.email !== email)
    saveLocalStorage('hilton-users', updateUsers)
}
}