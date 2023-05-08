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
  selectedFile!: File;
  imageUrl!: string
  onSelectFile: boolean=false;
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
     file:new FormControl(''),
   });
 }
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
  ajouterChambre() {
    console.log(this.value);
    this.addToFormGroup();
    console.log(this.accomodation);
    this.fb.controls['accommodation'].setValue(this.accomodation);
    //const formData1 = new FormData();
    //formData1.append('file', this.selectedFile,this.selectedFile.name);
    //this.fb.controls['file'].setValue(formData1);
    const formData : FormData = new FormData(); //Stores Key Value Pairs
      formData.append('file',this.selectedFile);
      formData.append('nomCH', this.fb.controls['nomCH'].value);
      formData.append('capacite', this.fb.controls['capacite'].value);
      formData.append('reductionEnfant', this.fb.controls['reductionEnfant'].value);
      formData.append('prixComplet', this.fb.controls['prixComplet'].value);
      formData.append('prixDemiPortion', this.fb.controls['prixDemiPortion'].value);
      formData.append('superfice', this.fb.controls['superfice'].value);
      formData.append('typech', this.fb.controls['typech'].value);
      formData.append('accommodation', this.fb.controls['accommodation'].value);
      //formData.append('idAccomodation', this.accomodation.idAccomodation.toString());
      //formData.append('name', this.fb.controls['accommodation.name'].value);
          //formData.append('addresse', this.fb.controls['accommodation.addresse'].value);
          //formData.append('stars', this.fb.controls['accommodation.stars'].value);
          //formData.append('typeAcc', this.fb.controls['accommodation.typeAcc'].value);
          //formData.append('email', this.fb.controls['accommodation.email'].value);
          //formData.append('description', this.fb.controls['accommodation.description'].value);
          //formData.append('ville', this.fb.controls['accommodation.ville'].value);
          //formData.append('amenities', this.fb.controls['accommodation.amenities'].value);
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
