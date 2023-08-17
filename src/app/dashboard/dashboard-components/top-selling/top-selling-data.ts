export interface Product {
    image: string,
    uname: string,
    gmail: string,
    productName: string,
    status: string,
    weeks: number,
    budget: string
}

export const TopSelling: Product[] = [

    {
        image: 'assets/images/users/photo_perazaa.png',
        uname: 'Luis Alberto Peraza Arbayo',
        gmail: 'easyone9634@gmail.com',
        productName: 'AFPS',
        status: 'danger',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/photo_thomas.png',
        uname: 'Thomas Fransisco Orozco Galindo',
        gmail: 'thomasorozco.uts@gmail.com',
        productName: 'AFPS',
        status: 'info',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/photo_rodolfo.jpg',
        uname: 'Rodolfo de Jesus Nuñez Berrelleza',
        gmail: 'rodoemma12@gmail.com',
        productName: 'AFPS',
        status: 'warning',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/photo_gerardo.png',
        uname: 'Gerardo Hernandez Martinez',
        gmail: 'ghm199830@gmail.com',
        productName: 'AFPS',
        status: 'success',
        weeks: 35,
        budget: '95K'
    },

]