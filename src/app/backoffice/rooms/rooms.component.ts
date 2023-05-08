import { AccomodationService } from './../../services/Accomodation.service';
import { ChambreService } from './../../services/chambre.service';
import { Component, OnInit } from '@angular/core';
import { Chambre } from 'src/app/models/chambre';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Accomodation } from 'src/app/models/accomodation';
import { Router } from '@angular/router';

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
  fb!:FormGroup;
  idChambre!:number
  selectedRadioButton!:any
  radioInput:any
  formGroupValue:any
<<<<<<< HEAD

=======
  selectedFile!: File;
  imageUrl!: string
  onSelectFile: boolean=false;
>>>>>>> origin/houssem-branch
  constructor(private chambreService:ChambreService,private router: Router) { }

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
<<<<<<< HEAD
 modifierChambre() {
  console.log(this.fb.value);
  this.addToFormGroup();
=======
onSelectedFile(event : any){
  this.selectedFile=event.target.files[0];
  this.onSelectFile = true;
  console.log((this.selectedFile))
  const reader = new FileReader();
    reader.onload = (e) => {
      this.imageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
}
 modifierChambre() {
  console.log(this.fb.value);
  this.addToFormGroup();
  const formData : FormData = new FormData();
  formData.append('file',this.selectedFile);
  formData.append('nomCH', this.fb.controls['nomCH'].value);
  formData.append('capacite', this.fb.controls['capacite'].value);
  formData.append('reductionEnfant', this.fb.controls['reductionEnfant'].value);
  formData.append('prixComplet', this.fb.controls['prixComplet'].value);
  formData.append('prixDemiPortion', this.fb.controls['prixDemiPortion'].value);
  formData.append('superfice', this.fb.controls['superfice'].value);
  formData.append('typech', this.fb.controls['typech'].value);
  //formData.append('accommodation', this.fb.controls['accommodation'].value);
  formData.append('idAccomodation', this.fb.controls['idAccomodation'].value);
  formData.append('name', this.fb.controls['name'].value);
      formData.append('addresse', this.fb.controls['addresse'].value);
      formData.append('stars', this.fb.controls['stars'].value);
      formData.append('typeAcc', this.fb.controls['typeAcc'].value);
      formData.append('email', this.fb.controls['email'].value);
      formData.append('description', this.fb.controls['description'].value);
      formData.append('ville', this.fb.controls['ville'].value);
      formData.append('amenities', this.fb.controls['amenities'].value);
>>>>>>> origin/houssem-branch
  this.chambreService.addCh(this.fb.value).subscribe((data) => {
    this.router.navigate(["/rooms"]);
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
  this.radioInput = document.querySelector('input[name="room-type"][value=this.formGroupValue]:not(:checked)')as HTMLInputElement;
  console.log(this.radioInput);
  this.radioInput.checked=true ;

}
Delete(idAcc: number) {
  this.chambreService.deleteChambre(idAcc).subscribe((data:boolean)=> {
    this.getChambres();
  })
}
}
