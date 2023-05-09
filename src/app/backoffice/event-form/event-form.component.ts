import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css',
  '../../../assets/css/paper-dashboard.css',
  '../../../assets/demo/demo.css',
  '../../../assets/css/bootstrap.min.css',],
  encapsulation: ViewEncapsulation.None,})
export class EventFormComponent implements OnInit {

  form !:FormGroup;

  @ViewChild("startDate", { static: true }) startDate!: ElementRef;
  @ViewChild("endDate", { static: true }) endDate!: ElementRef;
  @ViewChild("region", { static: true }) region!: ElementRef;
  @ViewChild("name", { static: true }) name!: ElementRef;
  @ViewChild("description", { static: true }) description!: ElementRef;

  constructor(private eventService: EventService,
    private router: Router,
    private activeRouter: ActivatedRoute) { }

    btnText: string = "Add";

  ngOnInit(): void {
    this.activeRouter.queryParams
      .subscribe(params => {
        // console.log(params);
        this.id = params['id'];
      }
    );

    if (this.id != null) {
      this.btnText = "Update";
      this.eventService.getById(this.id).subscribe((response: Event) => {
        console.log("getById", response);
        this.startDate.nativeElement.value = response.dateDebutEvent;
        this.endDate.nativeElement.value = response.dateFinEvent;
        this.region.nativeElement.value = response.regionEvent;
        this.name.nativeElement.value = response.nomEvent;
        this.description.nativeElement.value = response.descriptionEvent;
        })
    }
  }

  id: any;

  submit() {
    let event: Event = {
      idEvent: 0,
      dateDebutEvent: this.startDate.nativeElement.value,
      dateFinEvent: this.endDate.nativeElement.value,
      regionEvent: this.region.nativeElement.value,
      nomEvent: this.name.nativeElement.value,
      descriptionEvent: this.description.nativeElement.value,
      user: {id_user: 1}
    }

    if(this.id != null) {
      event.idEvent = this.id;
      this.eventService.update(event).subscribe((response: Event) => {
        // console.log("response", response)
        this.router.navigate(['/event']);
      });
    }
    else {
      this.eventService.add(event).subscribe((response: Event) => {
        // console.log("response", response)
        this.router.navigate(['/event']);
      });

    }
  }

}
