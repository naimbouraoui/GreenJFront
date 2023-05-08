import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Review} from "../../models/review";
import {ReviewService} from "../../services/review-service";
import {Reclamation} from "../../models/reclamation";
import {ReclamationService} from "../../services/reclamation-service";

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.html',
    '../../../assets/css/paper-dashboard.css',
    '../../../assets/demo/demo.css',
    '../../../assets/css/bootstrap.min.css',],
  encapsulation: ViewEncapsulation.None
})
export class ReclamationComponent implements OnInit {
  Reclamationlist: Array<Reclamation> = [];
  result: boolean = false;

  constructor(
    private reclamationService: ReclamationService
  ) { }

  ngOnInit(): void {
    this.getReclamation();
  }
  getReclamation(): void {
    this.reclamationService.getReclamations().subscribe((data: Reclamation[]) => {
      this.Reclamationlist = data;
    });
  }
   DeleteRec(idRec: number) {
    this.reclamationService.deleteReclamtion(idRec).subscribe((data:boolean)=> {
       this.result=data;
       this.getReclamation();
    });
   }
}
