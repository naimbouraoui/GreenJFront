import { Router } from '@angular/router';
import { Accomodation } from './../../models/accomodation';
import { AccomodationService } from './../../services/Accomodation.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css',
  '../../../assets/css/paper-dashboard.css',
  '../../../assets/demo/demo.css',
  '../../../assets/css/bootstrap.min.css',],
  encapsulation: ViewEncapsulation.None,
})
export class Page1Component implements OnInit {

  AccomodationList: Array<Accomodation> = [];
  result: boolean = false;
  show: boolean = false;
  ville1!:string;
  fb!:FormGroup
  accomodation!:Accomodation;
  amenitiesList = [  { value: 'pool', label: 'Swimming pool' },
     { value: 'gym', label: 'Fitness center' },  { value: 'spa', label: 'Spa and wellness center' },
     { value: 'wifi', label: 'wifi' },{ value: 'sona', label: 'Sona' },{ value: 'bar', label: 'bar' }];
  selectedRadioButton: any;

  constructor(
    private accomodationService: AccomodationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.infoForm();
    return this.getAccomodations()
  }
  infoForm() {
    this.fb = new FormGroup({
      idAccomodation:new FormControl(''),
     name: new FormControl('', Validators.required),
     addresse: new FormControl('', Validators.required),
     stars:new FormControl('',Validators.required),
     typeAcc:new FormControl('',Validators.required),
     email: new FormControl('', Validators.required),
     description: new FormControl('', Validators.required),
     ville:new FormControl('',Validators.required),
     //amenities: new FormArray([])
     amenities: new FormControl(''),
     Files:new FormArray([])
   });
  }
  getAccomodations(): void {
    this.accomodationService.getList().subscribe((data: Accomodation[]) => {
      this.AccomodationList = data;
    });
  }
  Delete(idAcc: number) {
    this.accomodationService.deleteAccomodation(idAcc).subscribe((data:boolean)=> {
      this.result=data;
      this.getAccomodations();
    })
  }
  onShow() {
      this.show = true;
  }
  getAccById(id:number): void {
    this.accomodationService.getAccbyId(id).subscribe((data: Accomodation) => {
     this.accomodation = data;
     this.onShow();
     console.log(this.accomodation);
     this.fb.setValue(this.accomodation);
     })
  }
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
  modifierAccomodation() {
    console.log(this.fb.value);
    this.accomodationService.modifierAcc(this.fb.value).subscribe((data) => {
      this.router.navigate(['/page1']);
    });
    this.getAccomodations();
  }
  onSelectStars(event:any){
    this.fb.controls['stars'].setValue(event.target.value)
  }
  onSelectacc(event:any){
    this.fb.controls['typeAcc'].setValue(event.target.value)
  }
  onSelect(event:any){
    this.ville1=event.target.value;
    this.fb.controls['ville'].setValue(event.target.value);
  }
}
