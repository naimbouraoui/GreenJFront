import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Accomodation } from 'src/app/models/accomodation';
import { AccomodationService } from 'src/app/services/Accomodation.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css',
  '../../../assets/Front/reservation/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
  '../../../assets/Front/reservation/lib/owlcarousel/assets/owl.carousel.min.css',
  '../../../assets/Front/reservation/lib/animate/animate.min.css',
  '../../../assets/Front/reservation/css/style.css',
  '../../../assets/Front/reservation/css/bootstrap.min.css']
})
export class BookComponent implements OnInit {
  hotels: Array<Accomodation> = [];
  fb!:FormGroup
  AccomodationList: Array<Accomodation> = [];

  constructor( private accomodationService: AccomodationService) { }

  ngOnInit(): void {
    return this.getAccomodations()
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
}
