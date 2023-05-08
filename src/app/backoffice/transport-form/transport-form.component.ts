import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transport } from 'src/app/models/transport';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-transport-form',
  templateUrl: './transport-form.component.html',
  styleUrls: ['./transport-form.component.css',
  '../../../assets/css/paper-dashboard.css',
  '../../../assets/demo/demo.css',
  '../../../assets/css/bootstrap.min.css',],
  encapsulation: ViewEncapsulation.None,})

export class TransportFormComponent implements OnInit {
  @ViewChild("typeMoyen", { static: true }) typeMoyen!: ElementRef<HTMLSelectElement>;
  @ViewChild("distance", { static: true }) distance!: ElementRef;
  
  constructor(private transportService: TransportService,
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
      this.transportService.getById(this.id).subscribe((response: Transport) => {
        console.log("getById", response);
        this.typeMoyen.nativeElement.value = response.type_moyen;
        this.distance.nativeElement.value = response.distance;
        })
    }
  }

  id: any;

  submit() {
    let transport: Transport = {
      id: 0,
      type_moyen: this.typeMoyen.nativeElement.selectedOptions[0].value,
      distance: this.distance.nativeElement.value,
      user: {id_user: 1}
    }
    // console.log("test", this.typeMoyen.nativeElement.selectedOptions[0].value);
    if(this.id != null) {
      transport.id = this.id;
      this.transportService.update(transport).subscribe((response: Transport) => {
        // console.log("response", response)
        this.router.navigate(['/transport']);
      });
    }
    else {
      this.transportService.add(transport).subscribe((response: Transport) => {
        // console.log("response", response)
        this.router.navigate(['/transport']);
      });
  
    }
  }

}
