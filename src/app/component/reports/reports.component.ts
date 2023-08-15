import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  showreport : boolean = false;

  showrep () {
    this.showreport = !this.showreport;
    console.log(this.showreport);
  }

}
