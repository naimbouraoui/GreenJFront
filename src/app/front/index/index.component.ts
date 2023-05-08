import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css',
  '../../../assets/Front/vendor/bootstrap/css/bootstrap.min.css',
  '../../../assets/Front/vendor/swiper/swiper-bundle.min.css',
  '../../../assets/Front/vendor/glightbox/css/glightbox.min.css',
  '../../../assets/Front/vendor/bootstrap-icons/bootstrap-icons.css',
  '../../../assets/Front/vendor/aos/aos.css',
  '../../../assets/Front/vendor/animate.css/animate.min.css',
  '../../../assets/Front/css/style.css',
/////////////////////////////////
'../../../assets/Front/reservation/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
'../../../assets/Front/reservation/lib/owlcarousel/assets/owl.carousel.min.css',
'../../../assets/Front/reservation/css/bootstrap.min.css',
'../../../assets/Front/reservation/css/style.css',
'../../../assets/Front/reservation/lib/animate/animate.min.css'
]
})
export class IndexComponent implements OnInit {
  fb!:FormGroup
  inputCount: Array<number>=[0];
  constructor() { }

  ngOnInit(): void {
  }
  addInput() {
    this.inputCount.push(this.inputCount.length + 1);
    console.log(this.inputCount)
  }
  removeRoomOption(): void {
    this.inputCount.length--;
  }
}
