import { TypeAccomodation } from './../../models/type-accomodation';
import { Accomodation } from 'src/app/models/accomodation';
import { AccomodationService } from './../../services/Accomodation.service';
import { ReservationService } from './../../services/reservation.service';
import { Reservation } from './../../models/reservation';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-accomodation-form',
  templateUrl: './accomodation-form.component.html',
  styleUrls: ['./accomodation-form.component.css'],
})
export class AccomodationFormComponent implements OnInit {
  accomodation: Accomodation=new Accomodation();
  accomodationForm!: FormGroup;

  constructor(
    public accomodationService:AccomodationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.infoForm();
  }
  infoForm() {
    this.accomodationService.dataForm = this.fb.group({
      name: ['', [Validators.required]],
      addresse: ['', [Validators.required]],
      email: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  addAccomodation() {
    const formData = new FormData();
    const accomodation = this.accomodationService.dataForm.value;
    // formData.append('article', JSON.stringify(product));
    formData.append('accomodation', JSON.stringify(accomodation));
    this.accomodationService.addAcc(formData).subscribe((data) => {
      this.router.navigate(['/']);
    });
  }
}

