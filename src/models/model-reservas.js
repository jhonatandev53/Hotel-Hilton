// src/models/model-reservas.js
import { fetchLocalStorage, saveLocalStorage } from '../utils/local-storage.js';

const KEY = 'hilton-reservas-parqueadero';

export function getReservas() {
    return fetchLocalStorage(KEY) || [];
}

export function puestoDisponible(numeroPuesto) {
    const reservas = getReservas();
    return !reservas.some(r => r.puesto === numeroPuesto);
}

export function getReservaDeUsuario(email) {
    const reservas = getReservas();
    return reservas.find(r => r.usuario === email);
}

export function guardarReserva(reserva) {
    const reservas = getReservas();
    reservas.push(reserva);
    saveLocalStorage(KEY, reservas);
    return reserva;
}

export function cancelarReserva(email, numeroPuesto) {
    const reservas = getReservas();
    const nuevasReservas = reservas.filter(
        r => !(r.usuario === email && r.puesto === numeroPuesto)
    );
    saveLocalStorage(KEY, nuevasReservas);
}