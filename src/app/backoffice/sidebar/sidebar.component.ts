import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css' ,
  '../../../assets/css/paper-dashboard.css',
  '../../../assets/demo/demo.css',
  '../../../assets/css/bootstrap.min.css',
],
encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
