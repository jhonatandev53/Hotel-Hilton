import { getUsers } from "../models/model-registro.js"
import { mostrarNotificacion } from "../utils/notifications.js"
import { saveSession } from "../utils/local-storage.js"

const form = document.querySelector('.login-form')

if (form){
    form.addEventListener('submit', (event) =>{
        event.preventDefault()

        const email = document.querySelector('#email')
        const password = document.querySelector('#password')

        const users = getUsers()

        if (!email.value || !password.value) {
            alert('Por favor completa todos los campos');
            return;
        }

        
        const adminEmail = 'melanylondono888@gmail.com'
        const adminPassword = '12345678m'


        if (!email.value || !password.value) {
            mostrarNotificacion('Por favor llenar todos los campos correctamente', 'error')
            return;
        }

        if (email.value === adminEmail && password.value === adminPassword){
            mostrarNotificacion('Bienvenido ADMIN', 'exito')
            setTimeout(() => {
                window.location.href = "/src/views/pages/admin.html"
            }, 1500)
            return
        }
        
        const users = getUsers()
        const usuarioEncontrado = users.find(user => user.email === email.value && user.password === password.value)

        if (usuarioEncontrado) {
            saveSession(usuarioEncontrado)
            mostrarNotificacion('Sesión iniciada correctamente', 'exito')

            const params = new URLSearchParams(window.location.search)
            const redirect = params.get('redirect')

            setTimeout(() => {
                if (redirect) {
                    window.location.href = redirect
                } else {
                    window.location.href = "/index.html"
                }
            }, 1500)

            
            const params = new URLSearchParams(window.location.search)
            const redirect = params.get('redirect')

            setTimeout(() =>{
                if (redirect){
                    window.location.href = redirect
                }
                else{
                    window.location.href = "/index.html"
                }
            },1500)

        }
        else{
            mostrarNotificacion('Credenciales invalidas', 'error')
        }

    })
}