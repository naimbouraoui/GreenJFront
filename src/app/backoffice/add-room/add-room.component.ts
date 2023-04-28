import { Router } from '@angular/router';
import { ChambreService } from './../../services/chambre.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css',
  '../../../assets/css/bootstrap.min.css',
  '../../../assets/demo/demo.css',
  '../../../assets/css/paper-dashboard.css',
]
})
export class AddRoomComponent implements OnInit {
  fb!:FormGroup;
  selectedRadioButton:any;
  constructor(private chambreService:ChambreService, private router:Router
  ) { }


  ngOnInit(): void {
    this.infoForm()
  }
  infoForm() {
    this.fb = new FormGroup({
     nomCH: new FormControl(''),
     capacite: new FormControl(''),
     prixComplet: new FormControl(''),
     prixDemiPortion: new FormControl(''),
     reductionEnfant: new FormControl(''),
     superfice: new FormControl(''),
     typech: new FormControl(''),
   });
 }
  ajouterChambre() {
    console.log(this.fb.value);
    this.addToFormGroup();
    this.chambreService.addroom(this.fb.value).subscribe((data) => {
      this.router.navigate(['/rooms']);
    });
  }
  addToFormGroup() {
    // get the selected radio button
     this.selectedRadioButton = document.querySelector('input[name="room-type"]:checked');

    // get the value of the selected radio button
    const selectedValue = this.selectedRadioButton.value;
    this.fb.controls['typech'].setValue(selectedValue);
  }
}
