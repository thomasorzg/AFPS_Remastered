import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  incubators: any[] = [];
  hola = [ 
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
    
  formGroup: FormGroup | any;

  constructor(
    private api: ApiService
    ) {}

  ngOnInit() {
    this.fetchIncubators();
  }

  fetchIncubators() {
    this.api.get('crud/incubators').subscribe((data: any) => {
      this.incubators = Object.keys(data).map(key => data[key]);
    });
  }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

}
