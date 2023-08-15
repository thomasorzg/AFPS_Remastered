export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string,
    href: string
}

export const topcards: topcard[] = [
    {
        bgcolor: 'success',
        icon: 'bi bi-person',
        title: '67',
        subtitle: 'Usuarios',
        href: '/component/users'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-people',
        title: '4',
        subtitle: 'Operadores',
        href: '/component/operators'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-thermometer-half',
        title: '2',
        subtitle: 'Incubadoras',
        href: '/component/incubators'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bell-fill',
        title: '104',
        subtitle: 'Alertas emitidas',
        href: '/component/monitoring'
    }
] 