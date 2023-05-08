import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Reclamation } from "../../models/reclamation";
import { ReclamationService } from "../../services/reclamation-service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-reclamation',
  templateUrl: 'reclamationFront.component.html',
  styleUrls: ['./reclamationFront.component.html',
    '../../../assets/css/paper-dashboard.css',
    '../../../assets/demo/demo.css',
    '../../../assets/css/bootstrap.min.css',],
  encapsulation: ViewEncapsulation.None,
})
export class ReclamationFrontComponent implements OnInit {
  reclamation: Reclamation=new Reclamation();
  nr !:FormGroup;
  constructor(
    public reclamationService:ReclamationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.infoForm();
  }
  infoForm() {
    this.nr = new FormGroup({
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      image: new FormControl

    });
  }
  addActivity() {
    console.log(this.nr.value);
    this.reclamationService.createReclamation(this.nr.value).subscribe((data) => {
      this.router.navigate(['/Complain']);
      this.nr.reset(); // reset the form after activity is added
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.reclamation.image = reader.result;
      };
    }
  }
  addReclamtion() {
    console.log(this.nr.value);
    this.reclamationService.createReclamation(this.nr.value).subscribe((data) => {
      this.router.navigate(['/Activities']);
      this.nr.reset(); // reset the form after activity is added
    });
  }

}
