import { Chambre } from "./chambre";
import { Reservation } from "./reservation";
import { TypeAccomodation } from "./type-accomodation";

export class Accomodation {
  idAccomodation!: number;
  name!: string;
  ville!: string;
  addresse!: string;
  email!:string
  image!: string;
  stars!: number;
  typeAcc!:TypeAccomodation
  description!:string
  //Chambre!: Array<Chambre>;
  //Resrvation!:Array<Reservation>;
  //constructor(name:string,ville:string,typeAcc:TypeAccomodation,)
}
