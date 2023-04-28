import { AccomodationService } from './../../services/Accomodation.service';
import { ChambreService } from './../../services/chambre.service';
import { Component, OnInit } from '@angular/core';
import { Chambre } from 'src/app/models/chambre';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Accomodation } from 'src/app/models/accomodation';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css',
  '../../../assets/css/bootstrap.min.css',
  '../../../assets/demo/demo.css',
  '../../../assets/css/paper-dashboard.css',
]
})
export class RoomsComponent implements OnInit {
  roomlist:Array<Chambre>=[];
  accomodation!: Accomodation;
  chambre!:Chambre;
  show: boolean = false;
  router: any;
  fb!:FormGroup;
  idChambre!:number
  selectedRadioButton!:any
  radioInput:any
  formGroupValue:any

  constructor(private chambreService:ChambreService) { }

  ngOnInit(): void {
    this.infoForm();
    return this.getChambres();
    }
  infoForm() {
    this.fb = new FormGroup({
     idCH: new FormControl(''),
     nomCH: new FormControl(''),
     capacite: new FormControl(''),
     prixComplet: new FormControl(''),
     prixDemiPortion: new FormControl(''),
     reductionEnfant: new FormControl(''),
     superfice: new FormControl(''),
     typech: new FormControl(''),
     accommodation: new FormControl(''),
   });
 }
  getChambres(): void {
    this.chambreService.getchambreList().subscribe((data: Chambre[]) => {
      this.roomlist = data;
      console.log(data)
    });
  }
  getRoomById(id:any):void{
this.chambreService.getChById(id).subscribe((data: Chambre) => {
  this.chambre = data;
  this.onShow();
  this.fb.setValue(this.chambre);
  })
}
 modifierChambre() {
  console.log(this.fb.value);
  this.addToFormGroup();
  this.chambreService.addCh(this.fb.value).subscribe((data) => {
  });
  this.getChambres();
}
onShow() {
  if (this.show == true) {
    this.show = false
  } else {
    this.show = true
  }
}
addToFormGroup() {
  // get the selected radio button
   this.selectedRadioButton = document.querySelector('input[name="room-type"]:checked');

  // get the value of the selected radio button
  const selectedValue = this.selectedRadioButton.value;
  this.fb.controls['typech'].setValue(selectedValue);
}
  checkRadioInput() {
  // get the value of the attribute in the form group
  this.formGroupValue = this.chambre.typech;
  console.log(this.formGroupValue);
  // find the radio input with the matching value and set its checked property to true
  this.radioInput = document.querySelector('input[value=this.formGroupValue]')as HTMLInputElement;
  console.log(this.radioInput);
  this.radioInput.checked=true ;

}
Delete(idAcc: number) {
  this.chambreService.deleteChambre(idAcc).subscribe((data:boolean)=> {
    this.getChambres();
  })
}
}
