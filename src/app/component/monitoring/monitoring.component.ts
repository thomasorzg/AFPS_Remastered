import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  incubators: any[] = [];

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

}
