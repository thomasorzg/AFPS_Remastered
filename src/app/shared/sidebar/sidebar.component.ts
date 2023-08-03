import { Component, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public sidebarnavItems: RouteInfo[] = [];

  showMenu = '';
  showSubMenu = '';

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter((sidebarnavItem) => sidebarnavItem);
  }

  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

}
