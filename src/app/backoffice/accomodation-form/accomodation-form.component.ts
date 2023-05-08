import { TypeAccomodation } from './../../models/type-accomodation';
import { Accomodation } from 'src/app/models/accomodation';
import { AccomodationService } from './../../services/Accomodation.service';
import { ReservationService } from './../../services/reservation.service';
import { Reservation } from './../../models/reservation';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/services/file.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-accomodation-form',
  templateUrl: './accomodation-form.component.html',
  styleUrls: ['./accomodation-form.component.css',
  '../../../assets/css/paper-dashboard.css',
  '../../../assets/demo/demo.css',
  '../../../assets/css/bootstrap.min.css',],
  encapsulation: ViewEncapsulation.None,
})
export class AccomodationFormComponent implements OnInit {

  ville1!:string;
  accomodation: Accomodation=new Accomodation();
  accomodationForm!: FormGroup;
  onSelectFile: boolean=false;
   fb !:FormGroup;
   amenitiesList = [  { value: 'pool', label: 'Swimming pool' },
     { value: 'gym', label: 'Fitness center' },  { value: 'spa', label: 'Spa and wellness center' },
     { value: 'wifi', label: 'wifi' },{ value: 'sona', label: 'Sona' },{ value: 'bar', label: 'bar' }];
     selectedFile!: File;
	   currentFile?: File;
     imageUrl!: string

	fileInfos?: Observable<any>;

	fileUrl : any; //File url to upload
	selected! : FileList;

  constructor(
    public accomodationService:AccomodationService,
    private router: Router,
    public fileService:FileService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.infoForm();
    //this.fileInfos = this.fileService.getAccomodationFiles();
  }
  infoForm() {
     this.fb = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
      addresse: new FormControl('', Validators.required),
      stars:new FormControl('',Validators.required),
      typeAcc:new FormControl(null,Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', Validators.required),
      ville:new FormControl('',Validators.required),
      //amenities: new FormArray([])
      amenities: new FormControl(''),
    });
  }

  onSelect(event:any){
    this.ville1=event.target.value;
    this.fb.controls['ville'].setValue(event.target.value);
  }
  onSelectStars(event:any){
    this.fb.controls['stars'].setValue(event.target.value)
  }
  onSelectacc(event:any){
    this.fb.controls['typeAcc'].setValue(event.target.value)
  }
  /*onCheckboxChange(event: any) {
    const amenitiesArray = this.fb.controls['amenities'] as FormArray;
    if (event.target.checked) {
      amenitiesArray.push(new FormControl(event.target.value));
    } else {
      const index = amenitiesArray.controls.findIndex(x => x.value === event.target.value);
      amenitiesArray.removeAt(index);
    }
  }*/
  onCheckboxChange = (event: any) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const amenitiesControl = this.fb.controls['amenities'];
    let amenities = amenitiesControl.value;

    if (isChecked) {
      if (amenities) {
        amenities += ' ';
      }
      amenities += value;
    } else {
      amenities = amenities.replace(`${value} `, '');
      amenities = amenities.replace(value, '');
    }
    amenitiesControl.setValue(amenities);
  };
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
  addAccomodation() {
    console.log(this.fb.value);
    console.log(this.ville1);
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe((res)=>{
        console.log(res);
      });
      const formData : FormData = new FormData(); //Stores Key Value Pairs
      formData.append('file',this.selectedFile);
      formData.append('name', this.fb.controls['name'].value);
      formData.append('addresse', this.fb.controls['addresse'].value);
      formData.append('stars', this.fb.controls['stars'].value);
      formData.append('typeAcc', this.fb.controls['typeAcc'].value);
      formData.append('email', this.fb.controls['email'].value);
      formData.append('description', this.fb.controls['description'].value);
      formData.append('ville', this.fb.controls['ville'].value);
      formData.append('amenities', this.fb.controls['amenities'].value);
      this.accomodationService.addAcc(formData).subscribe(() => this.goBack());
  }
}
  goBack(): void {
		//this.location.back();
	}
}
