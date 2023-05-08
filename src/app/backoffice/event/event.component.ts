import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Event } from 'src/app/models/event';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css',
  '../../../assets/css/paper-dashboard.css',
  '../../../assets/demo/demo.css',
  '../../../assets/css/bootstrap.min.css',],

})
export class EventComponent implements OnInit {

  events: Event[] = [];
  event!: Event;
  deleteEvent!: Event;
  editEvent!: Event;

  constructor(
    private eventService: EventService,
    ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getAll().subscribe(
      (response: Event[]) => {
        this.events = response;
        console.log(this.events);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteEventById(idEvent: number): void {
    this.eventService.delete(idEvent).subscribe(
      (response: void) => {
        this.getEvents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public onAddEvent(addForm: NgForm): void {
  //   document.getElementById('add-event-form')!.click();
  //   this.eventService.add(addForm.value).subscribe(
  //     (response: Event) => {
  //       console.log(response);
  //       this.getEvents();
  //       addForm.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       addForm.reset();
  //     }
  //   );
  // }

  // public onOpenModal(event: Event, mode: string): void {
  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');
  //   if (mode === 'add') {
  //     button.setAttribute('data-target', '#addEventModal');
  //   }
  //   if (mode === 'edit') {
  //     this.editEvent = event;
  //     button.setAttribute('data-target', '#updateEventModal');
  //   }
  //   if (mode === 'delete') {
  //     this.deleteEvent = event;
  //     button.setAttribute('data-target', '#deleteEventModal');
  //   }
  //   container!.appendChild(button);
  //   button.click();
  // }

}
