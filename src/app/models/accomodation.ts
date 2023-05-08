import { Chambre } from "./chambre";
import { HotelAmenity } from "./hotel-amenity";
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
  amenities!:String;
  fileid!:number
  //Chambre!: Array<Chambre>;
  //Resrvation!:Array<Reservation>;
  //constructor(name:string,ville:string,typeAcc:TypeAccomodation,)
}
