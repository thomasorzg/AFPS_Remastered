import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-incubators',
  templateUrl: './incubators.component.html',
  styleUrls: ['./incubators.component.scss']
})
export class IncubatorsComponent implements OnInit, OnDestroy {
  private deleteSubscription: Subscription | undefined;

  loading: boolean | undefined;
  results: any;

  form: any;

  incubator: any = {
    id: ''
  };

  operators: any[] = [];

  visible: boolean = false;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  
  selectedIncubator: any;
  detailVisible: boolean = false;

  constructor(
    public fun: FunctionsService,
    public auth: AuthService,
    public crud: CrudService,
    private formBuilder: UntypedFormBuilder,
    private messageService: MessageService,
    private api: ApiService
  ) {
    // Petición Get para obtener los operadores y mostrarlos en el select
    this.api.get(`crud/operators`).subscribe((data: any) => {
      this.operators = Object.keys(data).map(key => data[key]);
    });
  }

  ngOnInit() {
    this.getList();
    this.subscribeToDeleteEvent();
    
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      serie: ['', Validators.required],
      model: ['', Validators.required],
      operatorId: [''],
      status: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
  
  getList() {
    this.loading = true;

    this.crud.getList('incubators').subscribe((response: any) => {
      this.results = response;

      this.results.forEach((result: any) => {
        result.createdAt = this.fun.transformDate(result.createdAt);
        result.updatedAt = this.fun.transformDate(result.updatedAt);
      });

      this.loading = false;
    });
  }
  
  showDialog() {
    this.visible = true;
    this.isModalOpen = true;
  }

  showDetailDialog(incubator: any) {
    this.selectedIncubator = incubator;
    this.detailVisible = true;
  }

  hideDialog() {
    this.visible = false;
    this.isModalOpen = false;
    this.isEditMode = false;
    this.form.reset();
  }

  hideDetailDialog() {
    this.detailVisible = false;
    this.selectedIncubator = null;
  }

  editIncubator(incubator: any) {
    this.incubator = { ...incubator };

    this.form.markAsDirty();
    this.form.get('name').setValue(this.incubator.name);
    this.form.get('serie').setValue(this.incubator.serie);
    this.form.get('model').setValue(this.incubator.model);
    this.form.get('operatorId').setValue(this.incubator.operatorId);
    this.form.get('status').setValue(this.incubator.status);
  
    this.isEditMode = true; // Establece el modo de edición
    this.showDialog();
  }

  submit() {
    if (this.form.dirty && this.form.valid) {
      if (this.isEditMode) {
        this.update();
      } else {
        this.save();
      }
    } else {
      for (let i in this.form.controls) this.form.controls[i].markAsTouched();
    }
  }

  save() {
    this.loading = true;
    
    this.crud.save('incubators', this.form.value).subscribe((response: any) => {
      this.loading = false;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
      
      this.getList();
      
      this.hideDialog();
    });
  }
  
  update() {
    this.loading = true;

    this.crud.update(`incubators/${this.incubator.id}`, this.form.value).subscribe((response: any) => {
      this.loading = false;

      this.messageService.add({ severity: 'info', summary: 'Info', detail: '¡Incubadora actualizada!' });

      this.getList();
      
      this.hideDialog();
    });
  }

  confirmDelete(item: any) {
    this.crud.confirmDelete(item, 'incubators');
  }
  
  delete(item: any) {
    this.crud.delete(item, 'incubators');
  }

  subscribeToDeleteEvent() {
    this.deleteSubscription = this.crud.getDeleteObservable().subscribe(() => {
      this.getList();
    });
  }

}
