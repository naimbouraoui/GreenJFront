import { AccomodationService } from './../../services/Accomodation.service';
import { Router } from '@angular/router';
import { ChambreService } from './../../services/chambre.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Accomodation } from 'src/app/models/accomodation';
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css',
  '../../../assets/css/bootstrap.min.css',
  '../../../assets/demo/demo.css',
  '../../../assets/css/paper-dashboard.css',
]
})
export class AddRoomComponent implements OnInit {
  fb!: FormGroup;
  accomodation!:Accomodation;
  selectedRadioButton:any;
  value: number=0;

  constructor(private chambreService:ChambreService, private router:Router,private accomodationService:AccomodationService
  ) { }


  ngOnInit(): void {
    this.infoForm();
  }
  infoForm() {
    this.fb = new FormGroup({
    idaccomodation:new FormControl(''),
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
  ajouterChambre() {
    console.log(this.value);
    this.addToFormGroup();
    console.log(this.accomodation);
    this.fb.controls['accommodation'].setValue(this.accomodation);
    this.chambreService.addroom(this.fb.value).subscribe((data) => {
      this.router.navigate(['/rooms']);
    });
  }
  getAccById(id:number): void {
    this.accomodationService.getAccbyId(id).subscribe((data: Accomodation) => {
     this.accomodation = data;
     })
  }
  addToFormGroup() {

    // get the selected radio button
     this.selectedRadioButton = document.querySelector('input[name="room-type"]:checked');

    // get the value of the selected radio button
    const selectedValue = this.selectedRadioButton.value;
    this.fb.controls['typech'].setValue(selectedValue);
  }
}
