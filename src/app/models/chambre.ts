import { Accomodation } from './accomodation';
import { Typech } from './typech';
export class Chambre {
    idCH!:number ;
    NomCH!:string;
    Capacite!:number ;
    PrixComplet!:number;
    PrixDemiPortion!:number;
    ReductionEnfant!:number;
    Superfice!:number
    typeCh!: Typech;
    accomodation!: Accomodation;

}
