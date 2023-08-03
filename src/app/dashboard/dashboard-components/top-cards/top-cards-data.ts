export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [
    {
        bgcolor: 'success',
        icon: 'bi bi-person',
        title: '67',
        subtitle: 'Usuarios'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-people',
        title: '4',
        subtitle: 'Operadores'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-thermometer-half',
        title: '2',
        subtitle: 'Incubadoras'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bell-fill',
        title: '104',
        subtitle: 'Alertas emitidas'
    }
] 