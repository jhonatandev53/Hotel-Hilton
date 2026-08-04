import { getSession } from "../utils/local-storage.js"
import { mostrarNotificacion } from "../utils/notifications.js"
import { getReservas, puestoDisponible, guardarReserva } from "../models/model-reservas.js"

const session = getSession()
const btnPerson = document.querySelector('.header-button a[href*="log-in"]')

if (btnPerson) {
    if (session) {
        btnPerson.removeAttribute('href')
        btnPerson.querySelector('.material-symbols-outlined').textContent = 'logout'
        btnPerson.title = `Cerrar sesión (${session.email})`
        btnPerson.style.cursor = 'pointer'

        btnPerson.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.removeItem('hilton-session')
            window.location.href = '/index.html'
        })
    }
}

function aplicarReservasExistentes() {
    const reservas = getReservas()
    const puestosOcupados = reservas.map(r => r.puesto)

    document.querySelectorAll('.lot-spot').forEach(spot => {
        const numero = spot.querySelector('.spot-number')?.textContent.trim()
        if (puestosOcupados.includes(numero) && spot.classList.contains('free')) {
            spot.classList.remove('free')
            spot.classList.add('occupied')
            spot.innerHTML = `
                <span class="spot-number">${numero}</span>
                <span class="material-symbols-outlined car-icon">directions_car</span>
            `
        }
    })
}

let puestoSeleccionado = null

function initSeleccionPuestos() {
    const badge = document.querySelector('.selected-spot-badge')

    document.querySelectorAll('.lot-spot.free').forEach(spot => {
        spot.addEventListener('click', () => {
            const anterior = document.querySelector('.lot-spot.selected')
            if (anterior && anterior !== spot) {
                anterior.classList.remove('selected')
                anterior.classList.add('free')
                const num = anterior.querySelector('.spot-number').textContent.trim()
                anterior.innerHTML = `
                    <span class="spot-number">${num}</span>
                    <span class="text-free">DISPONIBLE</span>
                `
                anterior.addEventListener('click', clickHandler)
            }

            const numero = spot.querySelector('.spot-number').textContent.trim()
            puestoSeleccionado = numero

            spot.classList.remove('free')
            spot.classList.add('selected')
            spot.innerHTML = `
                <span class="spot-number">${numero}</span>
                <span class="material-symbols-outlined car-icon">check_circle</span>
            `

            if (badge) badge.textContent = numero
        })
    })
}

function clickHandler() {
    this.dispatchEvent(new Event('click'))
}

function initConfirmarReserva() {
    const btn = document.querySelector('.btn-confirm-booking')
    if (!btn) return

    btn.addEventListener('click', () => {
        const session = getSession()

        if (!session) {
            mostrarNotificacion('Tu sesión expiró. Por favor inicia sesión de nuevo.', 'error')
            window.location.href = '/src/views/pages/log-in.html?redirect=/src/views/pages/Mapa-parqueadero.html'
            return
        }

        if (!puestoSeleccionado) {
            mostrarNotificacion('Por favor selecciona un puesto en el mapa.', 'error')
            return
        }

        const placaInput = document.querySelector('input[placeholder="Ej: XYZ-789"]')
        const modeloInput = document.querySelector('input[placeholder="Ej: Toyota Corolla"]')
        const duracionSelect = document.querySelector('.custom-select')

        const placa = placaInput?.value.trim()
        if (!placa) {
            mostrarNotificacion('Por favor ingresa la placa del vehículo.', 'error')
            placaInput?.focus()
            return
        }

        if (!puestoDisponible(puestoSeleccionado)) {
            mostrarNotificacion(`El puesto ${puestoSeleccionado} acaba de ser ocupado. Por favor elige otro.`, 'error')
            location.reload()
            return
        }

        const reserva = {
            puesto: puestoSeleccionado,
            placa: placa.toUpperCase(),
            modelo: modeloInput?.value.trim() || 'No especificado',
            duracion: duracionSelect?.value || '1 Noche ($30.00)',
            usuario: session.email,
            fecha: new Date().toISOString()
        }

        guardarReserva(reserva)

        mostrarNotificacion(` Reserva confirmada\n\nPuesto: ${reserva.puesto}\nPlaca: ${reserva.placa}\nDuración: ${reserva.duracion}`)
        window.location.href = '/src/views/pages/Parqueadero.html'
    })
}

aplicarReservasExistentes()
initSeleccionPuestos()
initConfirmarReserva()
