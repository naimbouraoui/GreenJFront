<<<<<<< HEAD
=======

>>>>>>> origin/houssem-branch
import { AccomodationService } from './services/Accomodation.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
<<<<<<< HEAD
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
=======
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

>>>>>>> origin/houssem-branch
  title = 'greenj';
  btn2 = false;
  btn3 = false;

  constructor(
<<<<<<< HEAD
    private accomodationService: AccomodationService
=======
    //private accomodationService: AccomodationService
>>>>>>> origin/houssem-branch
  ) {

  }
  ngOnInit(): void {

<<<<<<< HEAD
    this.accomodationService.getList().subscribe(res => {
       console.log(res);

     })
  }

  showNext(i: any) {
    if (i == 2) {
      this.btn2 = true;
    } else if (i == 3) {
      this.btn3 = true;
    }
  }
=======
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

>>>>>>> origin/houssem-branch
}
