import { Accomodation } from './accomodation';
import { Typech } from './typech';
export class Chambre {
    idCH!:number ;
    nomCH!:string;
    capacite!:number ;
    prixComplet!:number;
    prixDemiPortion!:number;
    reductionEnfant!:number;
    superfice!:number;
    typech!: Typech;
    accommodation!: Accomodation;
    idaccomodation:any;
    nameacc:any
}
