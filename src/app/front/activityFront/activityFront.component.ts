import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Activity} from "../../models/activity";
import {ActivityService} from "../../services/activity-service";
import {Review} from "../../models/review";
import {ReviewComponent} from "../../backoffice/review/review.component";

@Component({
  selector: 'app-activityFront',
  templateUrl: './activityFront.component.html',
  styleUrls: ['./activityFront.component.html'
 ]

})
export class ActivityFrontComponent implements OnInit {

  ActivityList!: Activity[];
  result: boolean = false;

  constructor(
    private activityService: ActivityService ,
    private reviewService : ReviewComponent
  ) { }

  ngOnInit(): void {
    this.getActivities();
  }
  getActivities(): void {
    this.activityService.getActivities().subscribe((data: Activity[]) => {
      this.ActivityList = data;
    });
  }



 //  assignCurrentUserToActivity() : void {
 //    this.activityService.assignCurrentUserToActivity(this.result).subscribe((data: Activity[]) => {
 //      this.ActivityList = data;
 //    });
 // }




}
