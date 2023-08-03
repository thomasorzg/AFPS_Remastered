import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { ValidationService } from 'src/app/services/validation.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit, OnDestroy {
  private deleteSubscription: Subscription | undefined;

  loading: boolean | undefined;
  results: any;

  form: any;

  user: any = {
    id: ''
  };

  visible: boolean = false;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;

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
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: [''],
      role: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  getList() {
    this.loading = true;

    this.crud.getList('users').subscribe((response: any) => {
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

  hideDialog() {
    this.visible = false;
    this.isModalOpen = false;
    this.isEditMode = false;
    this.form.reset();
  }

  editUser(user: any) {
    this.user = { ...user };
  
    this.form.markAsDirty();
    this.form.get('name').setValue(this.user.name);
    this.form.get('email').setValue(this.user.email);
    this.form.get('role').setValue(this.user.role);
  
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
    
    this.crud.save('users', this.form.value).subscribe((response: any) => {
      this.loading = false;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
      
      this.getList();
      
      this.hideDialog();
    });
  }
  
  update() {
    this.loading = true;
    
    const updateData = { ...this.form.value };

    if (updateData.password === '') {
      delete updateData.password;
    }

    this.crud.update(`users/${this.user.id}`, updateData).subscribe((response: any) => {
      this.loading = false;

      this.messageService.add({ severity: 'info', summary: 'Info', detail: '¡Usuario actualizado!' });

      this.getList();
      
      this.hideDialog();
    });
  }

  confirmDelete(item: any) {
    if (item.id == this.auth.user.id) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: '¡No puedes eliminar tu propio usuario!' });
      return;
    }

    this.crud.confirmDelete(item, 'users');
  }
  
  delete(item: any) {
    this.crud.delete(item, 'users');
  }

  subscribeToDeleteEvent() {
    this.deleteSubscription = this.crud.getDeleteObservable().subscribe(() => {
      this.getList();
    });
  }

}
