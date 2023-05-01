import { Component, OnInit } from '@angular/core';

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
  '../../../assets/Front/css/style.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
