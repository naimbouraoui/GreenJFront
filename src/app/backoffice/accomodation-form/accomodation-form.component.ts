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
   fb !:FormGroup;
   amenitiesList = [  { value: 'pool', label: 'Swimming pool' },
     { value: 'gym', label: 'Fitness center' },  { value: 'spa', label: 'Spa and wellness center' },
     { value: 'wifi', label: 'wifi' },{ value: 'sona', label: 'Sona' },{ value: 'bar', label: 'bar' }];
     selectedFiles?: FileList;
	currentFile?: File;
	progress : any[] = [];
	message:string[] = [];

	previews: string[] = [];
	fileInfos?: Observable<any>;

	selectFiles(event: any): void {
		this.message = [];
		this.progress = [];
		this.selectedFiles = event.target.files;
    console.log(this.selectFiles);

		this.previews = [];
		if (this.selectedFiles && this.selectedFiles[0]) {
		  const numberOfFiles = this.selectedFiles.length;
		  for (let i = 0; i < numberOfFiles; i++) {
			const reader = new FileReader();

			reader.onload = (e: any) => {
			  console.log(e.target.result);
			  this.previews.push(e.target.result);
			};

			reader.readAsDataURL(this.selectedFiles[i]);
		  }
		}
	  }

	fileUrl : any; //File url to upload
	selected! : FileList;
	 uploadFiles(): void
	 {
		this.message = [];

		if (this.selectedFiles) {
		  for (let i = 0; i < this.selectedFiles.length; i++) {
			this.upload(i, this.selectedFiles[i]);
		  }
		}
	 }


	 //Use this after we have added the project to the database with a HTTP response of 200
	 uploadFilesToAccomodation(AccId: number): void
	 {
		this.message = [];

		if (this.selectedFiles) {
		  for (let i = 0; i < this.selectedFiles.length; i++) {
			this.uploadFileToAccomodation(i, this.selectedFiles[i],AccId);
		  }
		}
	 }
	 addAccomodationWithFiles(): void
	 {
    const filesArray = this.fb.controls['files'] as FormArray;
		if (this.selectedFiles) {
			for (let i = 0; i < this.selectedFiles.length; i++) {
				if(this.selectedFiles[i])
				{
					//upload project with files
          filesArray.push(new FormControl(this.selectedFiles[i]));
					//this.accomodation.user = this.projectService.storageUserAsStr.user;
					//we need to be able to handle to upload of both project files and project itself
				}
			}
		  }
		  this.addAccomodation();
      console.log(this.fb.controls["Files"].value);
      this.uploadFilesToAccomodation(20);
	 }
	 uploadFileToAccomodation(idx: number, file:File, AccId: number): void
	 {
		this.progress[idx] = { value: 0, fileName: file.name };

		if (file) {
		  this.fileService.uploadAccomodationFileByAccId(file,AccId).subscribe({
			next: (event: any) => {
			  if (event.type === HttpEventType.UploadProgress) {
				this.progress[idx].value = Math.round(100 * event.loaded / event.total);
			  } else if (event instanceof HttpResponse) {
				const msg = 'Uploaded the file successfully: ' + file.name;
				this.message.push(msg);
				this.fileInfos = this.fileService.getAccomodationFilesByAccId(AccId);
			  }
			},
			error: (err: any) => {
			  this.progress[idx].value = 0;
			  const msg = 'Could not upload the file: ' + file.name;
			  this.message.push(msg);
			  this.fileInfos = this.fileService.getAccomodationFilesByAccId(AccId);
			},
			complete: () => {
				// Add Project and link its files
			}
		  });
		}
	 }
	  upload(idx : number , file:File): void {
		this.progress[idx] = { value: 0, fileName: file.name };

		if (file) {
		  this.fileService.uploadFile(file).subscribe({
			next: (event: any) => {
			  if (event.type === HttpEventType.UploadProgress) {
				this.progress[idx].value = Math.round(100 * event.loaded / event.total);
			  } else if (event instanceof HttpResponse) {
				const msg = 'Uploaded the file successfully: ' + file.name;
				this.message.push(msg);
				this.fileInfos = this.fileService.getAccomodationFiles();
			  }
			},
			error: (err: any) => {
			  this.progress[idx].value = 0;
			  const msg = 'Could not upload the file: ' + file.name;
			  this.message.push(msg);
			  this.fileInfos = this.fileService.getAccomodationFiles();
			}
		  });
    }
  }
  constructor(
    public accomodationService:AccomodationService,
    private router: Router,
    public fileService:FileService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.infoForm();
    this.fileInfos = this.fileService.getAccomodationFiles();
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
      files: new FormArray([]),
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
  addAccomodation() {
    console.log(this.fb.value);
    console.log(this.ville1);
    this.accomodationService.addAcc(this.fb.value).subscribe(() => this.goBack());
  }
  goBack(): void {
		this.location.back();
	}
}
