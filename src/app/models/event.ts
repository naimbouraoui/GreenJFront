export interface Event {
    idEvent: number,
    dateDebutEvent: Date,
    dateFinEvent: Date,
    regionEvent: String,
    nomEvent: string,
    descriptionEvent: string,
    user: User
}

export interface User {
    id_user: number
}