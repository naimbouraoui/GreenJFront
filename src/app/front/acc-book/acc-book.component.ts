import { ChambreService } from './../../services/chambre.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Accomodation } from 'src/app/models/accomodation';
import { Chambre } from 'src/app/models/chambre';
import { Typech } from 'src/app/models/typech';
import { AccomodationService } from 'src/app/services/Accomodation.service';

@Component({
  selector: 'app-acc-book',
  templateUrl: './acc-book.component.html',
  styleUrls: ['./acc-book.component.css',
  '../../../assets/Front/reservation/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
  '../../../assets/Front/reservation/lib/owlcarousel/assets/owl.carousel.min.css',
  '../../../assets/Front/reservation/lib/animate/animate.min.css',
  '../../../assets/Front/reservation/css/style.css',
  '../../../assets/Front/reservation/css/bootstrap.min.css'],
})
export class AccBookComponent implements OnInit {
  show:boolean=true;
  hotels: Array<Accomodation> = [];
  RoomsList: Array<Chambre> = [];
  fb!:FormGroup
  AccomodationList: Array<Accomodation> = [];
  datedebut!:any;
  datefin!:Date;
  ville!:string;
  tyrooms:Array<Typech>=[]
  inputCount: Array<number>=[0];
  i!:number;
  nbrChilds:Array<number>=[];
  nbenfants!:number;
  pention:any;
  price!:any
  show1:boolean=false;
  constructor( private accomodationService: AccomodationService,private chambreService:ChambreService) { }

  ngOnInit(): void {
    this.i=0;
    return this.getAccomodations();
    this.show=true;

  }
  range(n: any) {
    return Array.from({ length: n }, (_, i) => i);
  }
  getAccomodations(): void {
    this.accomodationService.getList().subscribe((data: Accomodation[]) => {
      this.AccomodationList = data;
      console.log(this.AccomodationList);
    });
  }
  getAccomodationsByneeds(tyrooms:any,datedebut:Date,datefin:Date,ville:String): void {
    this.accomodationService.getListByNeeds(ville,datedebut,datefin,tyrooms).subscribe((data: Accomodation[]) => {
      console.log(data);
      this.AccomodationList = data;
      console.log(this.AccomodationList);
    });
  }
  addInput() {
    this.inputCount.push(this.inputCount.length-1 + 1);
    console.log(this.inputCount)
  }
  removeRoomOption(index:any): void {
    this.inputCount.length--;
    this.tyrooms.splice(index,1);
    console.log(this.inputCount)
    console.log(this.tyrooms)
     // remove input count at index
  }
  onCitySelect(event:any){
    this.ville=event.target.value;
    console.log(this.ville)
  }
  onRoomSelect(event:any,i:number){
    this.tyrooms[i]=event.target.value
    console.log(this.tyrooms)
  }
  onDateChange(event: any) {
    this.datedebut=event.target.value;
  }
  onDatefinChange(event: any) {
    this.datefin=event.target.value;

  }
  getRoomsForReservation(ida:number,startDate:Date,endDate:Date,typeChambres:Array<Typech>):void{
    this.accomodationService.getRoomsForReservation(ida,startDate,endDate,typeChambres).subscribe((data: Chambre[]) => {
      console.log("roomsList:",data);
      this.RoomsList = data;
      this.show=false;
  });
  }
  onnbrChild(event: any) {
    this.nbenfants=event.target.value;
  }
  addChild(i:any){
    this.nbrChilds[0]=this.nbenfants;
  }
  onPentionSelect(event:any){
    this.pention=event.target.value;
  }
  getRoomsPrice(nbchilds:Array<number>,Option:string){
    const formData : FormData = new FormData();
    for (const room of this.RoomsList) {
      formData.append('idCH', room.idCH.toString());
      formData.append('nomCH', room.nomCH);
      formData.append('capacite', room.capacite.toString());
      formData.append('prixComplet', room.prixComplet.toString());
      formData.append('prixDemiPortion', room.prixDemiPortion.toString());
      formData.append('reductionEnfant', room.reductionEnfant.toString());
      formData.append('superfice', room.superfice.toString());
      formData.append('typech', room.typech.toString());
    }
    this.chambreService.RoomsPrice(formData,nbchilds,Option).subscribe((data: any) => {
      this.price = data;
  });
}
}
