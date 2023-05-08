import { Accomodation } from './accomodation';
import { Chambre } from './chambre';
import { User } from './user';
export class Reservation {
  dateDebut!:Date
  dateFin!:Date
  idR!:number
  mobile!:string
  prixtotale!:number
  reservationDate!:Date
  totalDays!:number
  user!:User
}
