import { TypeAccomodation } from './../../models/type-accomodation';
import { Accomodation } from 'src/app/models/accomodation';
import { AccomodationService } from './../../services/Accomodation.service';
import { ReservationService } from './../../services/reservation.service';
import { Reservation } from './../../models/reservation';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
     { value: 'wifi', label: 'wifi' },{ value: 'gym', label: 'gym' },{ value: 'bar', label: 'bar' }];
  constructor(
    public accomodationService:AccomodationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.infoForm();
  }
  infoForm() {
     this.fb = new FormGroup({
      name: new FormControl('', Validators.required),
      addresse: new FormControl('', Validators.required),
      stars:new FormControl('',Validators.required),
      typeAcc:new FormControl('',Validators.required),
      email: new FormControl('', Validators.required),
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
  addAccomodation() {
    console.log(this.fb.value);
    console.log(this.ville1);
    this.accomodationService.addAcc(this.fb.value).subscribe((data) => {
      this.router.navigate(['/']);
    });
  }
}

