import { getSession } from "../utils/local-storage.js"


function getReservas() {
    return JSON.parse(localStorage.getItem('hilton-reservas-parqueadero')) || []
}

function saveReservas(reservas) {
    localStorage.setItem('hilton-reservas-parqueadero', JSON.stringify(reservas))
}
import { mostrarNotificacion } from "../utils/notifications.js"
import { getReservaDeUsuario, cancelarReserva } from "../models/model-reservas.js"


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

const btnAlquilar = document.querySelector('.btn-alquilar-link')

if (btnAlquilar) {
    btnAlquilar.addEventListener('click', (event) => {
        event.preventDefault()
        const mapaURL = btnAlquilar.getAttribute('href')

        if (session) {
            window.location.href = mapaURL
        } else {
            const loginURL = `/src/views/pages/log-in.html?redirect=${encodeURIComponent(mapaURL)}`
            window.location.href = loginURL
        }
    })
}

/* Aqui permite reservar o cancelar reserva */


if (session) {
    const reservas = getReservas()
    const miReserva = reservas.find(r => r.usuario === session.email)

if (session) {
    const miReserva = getReservaDeUsuario(session.email)


    if (miReserva) {
        const cardHeader = document.querySelector('.map-section .card-header')
        if (cardHeader) {
            const aviso = document.createElement('div')
            aviso.style.cssText = `
                margin-top: 12px;
                padding: 10px 14px;
                background-color: #D1FAE5;
                border: 1px solid #10B981;
                border-radius: 8px;
                color: #065F46;
                font-size: 13px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
            `
            aviso.innerHTML = `
                <span class="material-symbols-outlined" style="font-size:18px">check_circle</span>
                <span>Tu reserva activa: Puesto <strong>${miReserva.puesto}</strong> — ${miReserva.placa} — ${miReserva.duracion}</span>
                <button id="btn-cancelar-reserva" style="
                    margin-left: auto;
                    padding: 5px 12px;
                    background-color: #EF4444;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                ">Cancelar reserva</button>
            `
            cardHeader.appendChild(aviso)

            document.getElementById('btn-cancelar-reserva').addEventListener('click', () => {
                const confirmar = confirm(`¿Seguro que deseas cancelar la reserva del puesto ${miReserva.puesto}?`)
                if (!confirmar) return


                const nuevasReservas = reservas.filter(
                    r => !(r.usuario === session.email && r.puesto === miReserva.puesto)
                )
                saveReservas(nuevasReservas)
                aviso.remove()
                alert(`Reserva del puesto ${miReserva.puesto} cancelada correctamente.`)
            })
        }
    }
}


                cancelarReserva(session.email, miReserva.puesto)
                aviso.remove()
                mostrarNotificacion(`Reserva del puesto ${miReserva.puesto} cancelada correctamente.`, 'exito')
            }
        
    


