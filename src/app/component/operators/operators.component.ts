import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit, OnDestroy {
  private deleteSubscription: Subscription | undefined;

  loading: boolean | undefined;
  results: any;

  form: any;

  operator: any = {
    id: ''
  };

  visible: boolean = false;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  
  selectedOperator: any;
  detailVisible: boolean = false;

  constructor(
    public fun: FunctionsService,
    public auth: AuthService,
    public crud: CrudService,
    private formBuilder: UntypedFormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getList();
    this.subscribeToDeleteEvent();
    
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      gender: ['', Validators.required],
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

    this.crud.getList('operators').subscribe((response: any) => {
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

  showDetailDialog(operator: any) {
    this.selectedOperator = operator;
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
    this.selectedOperator = null;
  }

  editOperator(operator: any) {
    this.operator = { ...operator };
  
    this.form.markAsDirty();
    this.form.get('name').setValue(this.operator.name);
    this.form.get('address').setValue(this.operator.address);
    this.form.get('phone').setValue(this.operator.phone);
    this.form.get('email').setValue(this.operator.email);
    this.form.get('gender').setValue(this.operator.gender);
    this.form.get('status').setValue(this.operator.status);
  
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
    
    this.crud.save('operators', this.form.value).subscribe((response: any) => {
      this.loading = false;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
      
      this.getList();
      
      this.hideDialog();
    });
  }
  
  update() {
    this.loading = true;

    this.crud.update(`operators/${this.operator.id}`, this.form.value).subscribe((response: any) => {
      this.loading = false;

      this.messageService.add({ severity: 'info', summary: 'Info', detail: '¡Operador actualizado!' });

      this.getList();
      
      this.hideDialog();
    });
  }

  confirmDelete(item: any) {
    this.crud.confirmDelete(item, 'operators');
  }
  
  delete(item: any) {
    this.crud.delete(item, 'operators');
  }

  subscribeToDeleteEvent() {
    this.deleteSubscription = this.crud.getDeleteObservable().subscribe(() => {
      this.getList();
    });
  }

}
