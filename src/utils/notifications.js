export const mostrarNotificacion = (mensaje, tipo) => {
    const notification = document.createElement('div')

    notification.className = 'notify' 
    notification.textContent =  mensaje

    notification.classList.add(tipo)
    document.documentElement.appendChild(notification)

    document.body.appendChild(notification)


    setTimeout(()=>{
        notification.remove()
    }, 3000)
}