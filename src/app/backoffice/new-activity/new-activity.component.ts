import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Accomodation} from "../../models/accomodation";
import {Activity} from "../../models/activity";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccomodationService} from "../../services/Accomodation.service";
import {Router} from "@angular/router";
import {ActivityService} from "../../services/activity-service";

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.html',
    '../../../assets/css/paper-dashboard.css',
    '../../../assets/demo/demo.css',
    '../../../assets/css/bootstrap.min.css',],
  encapsulation: ViewEncapsulation.None,
})
export class NewActivityComponent implements OnInit {
  activity: Activity=new Activity();
  na !:FormGroup;
  constructor(
    public activityService:ActivityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.infoForm();
  }
  infoForm() {
    this.na = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      description:new FormControl('',Validators.required),
      region:new FormControl('',Validators.required),
      image :new FormControl(),
      acDate :new FormControl('',Validators.required),
      acTime :new FormControl('',Validators.required),
      type :new FormControl('',Validators.required),
    });
  }
  addActivity() {
    console.log(this.na.value);
    this.activityService.addActivity(this.na.value).subscribe((data) => {
      this.router.navigate(['/Activities']);
      this.na.reset(); // reset the form after activity is added
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.activity.image = reader.result;
      };
    }
  }


}
