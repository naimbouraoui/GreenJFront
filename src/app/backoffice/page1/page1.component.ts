import { Accomodation } from 'src/app/models/accomodation';
import { AccomodationService } from './../../services/Accomodation.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';


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

  constructor(
    private accomodationService: AccomodationService
  ) { }

  ngOnInit(): void {
    return this.getAccomodations()
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

}
