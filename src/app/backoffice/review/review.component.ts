import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Review} from "../../models/review";
import {ReviewService} from "../../services/review-service";


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.html',
    '../../../assets/css/paper-dashboard.css',
    '../../../assets/demo/demo.css',
    '../../../assets/css/bootstrap.min.css',],
  encapsulation: ViewEncapsulation.None,
})
export class ReviewComponent implements OnInit {

  ReviewList: Array<Review> = [];
  result: boolean = false;

  constructor(
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.getReviews();
  }
  getReviews(): void {
    this.reviewService.getReviews().subscribe((data: Review[]) => {
      this.ReviewList = data;
    });
  }
  Delete(idRev: number) {
    this.reviewService.deleteReview(idRev).subscribe((data:boolean)=> {
      this.result=data;
      this.getReviews();
    })
  }

}
