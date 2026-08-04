import { saveUser, getUsers } from '../models/model-registro.js';
import { mostrarNotificacion } from '../utils/notifications.js';

const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullNameInput = document.querySelector('#fullname');
        const emailInput = document.querySelector('#email');
        const employeeIdInput = document.querySelector('#employee-id');
        const passwordInput = document.querySelector('#password');
        const termsInput = document.querySelector('#terms');

        const userData = {
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            employeeId: employeeIdInput.value.trim(),
            password: passwordInput.value.trim(),
            acceptedTerms: termsInput.checked
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

        if (!userData.fullName) {
            mostrarNotificacion('El nombre completo es obligatorio', 'error')
            return;
        }

        if (!userData.email) {
            mostrarNotificacion('El correo electronico es obligatorio', 'error')
            return;
        }

        if (!userData.employeeId) {
            mostrarNotificacion('El ID del empleado es obligatorio', 'error')
            return;
        }

        if (!userData.password) {
            mostrarNotificacion('La contraseña es obligatoria', 'error')
            return;
        }

        if (!emailRegex.test(userData.email)){
            mostrarNotificacion('El correo  no presenta un formato valido', 'error')
            return;
        }

        if (!passwordRegex.test(userData.password)){
            mostrarNotificacion('La contraseña debe contener como minimo 8 caracteres , numeros y letras', 'error')
            return;
        }

        if (isNaN(userData.employeeId)){
            mostrarNotificacion('El ID del empleado debe contener unicamente números', 'error')
            return;
        }

        const usuarios = getUsers()
        const emailExiste = usuarios.find(user => user.email === userData.email)

        if (emailExiste){
            mostrarNotificacion('Este correo ya esta en uso', 'error')
            return;
        }


        if (!userData.acceptedTerms) {
            mostrarNotificacion('Debes aceptar los terminos del servicio', 'error')
            return;
        }

        saveUser(userData);
        form.reset();
        window.location.href = "/src/views/pages/log-in.html";
    });
}