import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Transport } from 'src/app/models/transport';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css',
  '../../../assets/css/paper-dashboard.css',
  '../../../assets/demo/demo.css',
  '../../../assets/css/bootstrap.min.css',],
  encapsulation: ViewEncapsulation.None,})
export class TransportComponent implements OnInit {

  transports: any[] = [];
  transport!: any;
  deleteTransport!: Transport;
  editTransport!: Transport;

  constructor(
    private transportService: TransportService,
    ) { }

  ngOnInit(): void {
    this.getTransports();
  }

  getTransports(): void {
    this.transportService.getAll().subscribe(
      (response: Transport[]) => {
        this.transports = response;
        console.log(this.transports);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteTransportById(idTransport: number): void {
    this.transportService.delete(idTransport).subscribe(
      (response: void) => {
        this.getTransports();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}