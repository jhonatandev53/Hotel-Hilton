import { getUsers, deleteUser } from "../models/model-registro.js";
import { mostrarNotificacion } from "../utils/notifications.js";

let users = getUsers()
const tableContent = document.querySelector('.table-content')
const busqueda = document.querySelector('.search-bar')


const renderTable = (listaDeUsuarios) =>{
        tableContent.innerHTML = ''

        listaDeUsuarios.forEach(user => {
        
        
            const fila = document.createElement('tr')
        
            fila.innerHTML = `
            <td data-label="Nombre">${user.fullName}</td>
            <td data-label="Correo">${user.email}</td>
            <td data-label="ID Empleado">${user.employeeId}</td>
            <td data-label="Eliminar"><button class="btn-eliminar"><i class="fa-solid fa-trash-can"></i></button></td>
            `
        
            const deleteButton = fila.querySelector('.btn-eliminar')
        
            deleteButton.addEventListener('click',()=>{
        
                const confirmar = confirm(`¿ Seguro que quieres eliminar a ${user.fullName} ? `)
        
                if (confirmar){
                    
                    deleteUser(user.email)

                    fila.remove()

                    users = getUsers()

                    mostrarNotificacion('Usuario eliminado con éxito','exito')
                    
                }
            })
            
            tableContent.appendChild(fila)
            
        });

    }

busqueda.addEventListener('input',()=>{
    const input = busqueda.value.toLowerCase().trim()

    const filteredUsers = users.filter(user =>{
        return user.fullName.toLowerCase().includes(input)
    })

    renderTable(filteredUsers)
})

renderTable(users)
        



