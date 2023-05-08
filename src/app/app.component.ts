import { AccomodationService } from './services/Accomodation.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'greenj';
  btn2 = false;
  btn3 = false;

  constructor(
    //private accomodationService: AccomodationService
  ) {

  }
  ngOnInit(): void {

    //   //this.accomodationService.getList().subscribe(res => {
    //      //console.log(res);
    //
    //    })
    // }

    // showNext(i: any) {
    //   if (i == 2) {
    //     this.btn2 = true;
    //   } else if (i == 3) {
    //     this.btn3 = true;
    //   }
    }

}
