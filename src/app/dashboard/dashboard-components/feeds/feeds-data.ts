export interface Feed {
    class: string,
    icon: string,
    task: string,
    time: string
}

export const Feeds: Feed[] = [

    {
        "class": "bg-info",
        "icon": "bi bi-bell",
        "task": "Tienes 4 tareas pendientes.",
        "time": "Ahora mismo"
    },
    {
        "class": "bg-success",
        "icon": "bi bi-hdd",
        "task": "Servidor #1 sobrecargado.",
        "time": "Hace 2 horas"
    },
    {
        "class": "bg-warning",
        "icon": "bi bi-bag-check",
        "task": "Nuevo pedido recibido.",
        "time": "31 de mayo"
    },
    {
        "class": "bg-danger",
        "icon": "bi bi-person",
        "task": "Nuevo usuario registrado.",
        "time": "30 de mayo"
    },
    {
        "class": "bg-primary",
        "icon": "bi bi-person",
        "task": "Tienes una nueva contraseña.",
        "time": "21 de mayo"
    },
    {
        "class": "bg-info",
        "icon": "bi bi-person",
        "task": "Nuevo pedido recibido.",
        "time": "Ahora mismo"
    },
    {
        "class": "bg-primary",
        "icon": "bi bi-bell",
        "task": "Tienes 4 tareas pendientes.",
        "time": "Ahora mismo"
    }
    
] 