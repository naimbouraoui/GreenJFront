export interface Transport {
    id: number,
    type_moyen: string,
    distance: number,
    user: User
}

export interface User {
    id_user: number
}