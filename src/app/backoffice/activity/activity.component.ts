import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Activity} from "../../models/activity";
import {ActivityService} from "../../services/activity-service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.html',
    '../../../assets/css/paper-dashboard.css',
    '../../../assets/demo/demo.css',
    '../../../assets/css/bootstrap.min.css',],
  encapsulation: ViewEncapsulation.None

})
export class ActivityComponent implements OnInit {

  ActivityList!: Activity[];
  result: boolean = false;

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.getActivities();
  }
  getActivities(): void {
    this.activityService.getActivities().subscribe((data: Activity[]) => {
      this.ActivityList = data;
    });
  }
  Delete(idAct: number) {
    this.activityService.deleteActivity(idAct).subscribe((data:boolean)=> {
      this.result=data;
      this.getActivities();
    })
  }
  updateActivity(idActivity:number){
    this.activityService.updateActivity(idActivity).subscribe((data: Activity[])=>{
      this.ActivityList = data ;
      this.getActivities();
    })
  }


}
