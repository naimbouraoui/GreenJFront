import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Accomodation } from 'src/app/models/accomodation';
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
  '../../../assets/Front/reservation/css/bootstrap.min.css']
})
export class AccBookComponent implements OnInit {

  hotels: Array<Accomodation> = [];
  fb!:FormGroup
  AccomodationList: Array<Accomodation> = [];
  datedebut!:any;
  datefin!:Date;
  ville!:string;
  tyrooms:Array<Typech>=[]
  inputCount: Array<number>=[0];
  constructor( private accomodationService: AccomodationService) { }

  ngOnInit(): void {
    return this.getAccomodations();
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
  }
