import { Chambre } from "./chambre";
import { Reservation } from "./reservation";

export class Accomodation {
  idAccomodation!: number;
  name!: string;
  ville!: string;
  adresse!: string;
  image!: string;
  stars!: number;
  Chambre!: Array<Chambre>;
  Resrvation!:Array<Reservation>;
}
