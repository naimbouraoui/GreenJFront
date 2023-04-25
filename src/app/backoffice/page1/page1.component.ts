import { Accomodation } from 'src/app/models/accomodation';
import { AccomodationService } from './../../services/Accomodation.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  chambres = [
    {"idCH":1, "typech":"SIMPLE","accommodation":{"idAccomodation":1,"name":"EL 4444","ville":null,"typeAcc":null,"addresse":null,"stars":0},"reductionEnfant":200,"prixDemiPortion":740,"prixComplet":1050,"capacite":4,"superfice":140,"nomCH":"chambre vue sur mer"},
    {"idCH":1, "typech":"SIMPLE","accommodation":{"idAccomodation":1,"name":"EL 4444","ville":null,"typeAcc":null,"addresse":null,"stars":0},"reductionEnfant":200,"prixDemiPortion":740,"prixComplet":1050,"capacite":4,"superfice":140,"nomCH":"chambre vue sur mer"},
    {"idCH":1, "typech":"SIMPLE","accommodation":{"idAccomodation":1,"name":"EL 4444","ville":null,"typeAcc":null,"addresse":null,"stars":0},"reductionEnfant":200,"prixDemiPortion":740,"prixComplet":1050,"capacite":4,"superfice":140,"nomCH":"chambre vue sur mer"},
    {"idCH":1, "typech":"SIMPLE","accommodation":{"idAccomodation":1,"name":"EL 4444","ville":null,"typeAcc":null,"addresse":null,"stars":0},"reductionEnfant":200,"prixDemiPortion":740,"prixComplet":1050,"capacite":4,"superfice":140,"nomCH":"chambre vue sur mer"}
  ];
  AccomodationList: Array<Accomodation> = [];
  result: boolean = false;

  constructor(
    private accomodationService: AccomodationService
  ) { }

  ngOnInit(): void {
    return this.getAccomodations()
  }
  getAccomodations(): void {
    this.accomodationService.getList().subscribe((data: Accomodation[]) => {
      this.AccomodationList = data;
    });
  }
  Delete(idAcc: number) {
    this.accomodationService.deleteAccomodation(idAcc).subscribe((data:boolean)=> {
      this.result=data;
    })
  }

}
