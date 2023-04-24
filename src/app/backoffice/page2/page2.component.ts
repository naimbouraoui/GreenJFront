import { ReservationService } from './../../services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  ReservationList: Array<Reservation> = [];
  nbJours:number=0;

  constructor(private reservationService : ReservationService) { }

  ngOnInit(): void {
    return this.getReservations();
  }
  getReservations(): void {
    this.reservationService.getReservationsList().subscribe((data: Reservation[]) => {
      this.ReservationList = data;
    });
  }
  calculNBjours(idR:number):void{
    this.reservationService.calculerNBjours(idR).subscribe((data: number)=>{
      this.nbJours=data;
      console.log(this.nbJours);

    })
  }

}
