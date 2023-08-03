import { Injectable, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { FunctionsService } from './functions.service';
import { Observable, Subject, catchError, takeUntil, tap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

/**
 * Servicio para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la base de datos.
 * Proporciona métodos para obtener listas, confirmar y realizar eliminaciones.
 */
@Injectable({
  providedIn: 'root',
})
export class CrudService implements OnDestroy {
  private deleteSubject: Subject<void> = new Subject<void>(); // Sujeto utilizado para emitir un evento de eliminación
  
  tenantId: any;
  settings: any = {};

  constructor(
    private api: ApiService, 
    private fun: FunctionsService,
    private messageService: MessageService
  ) {}

  /**
   * Método para realizar la limpieza y liberación de recursos cuando el servicio se destruye.
   */
  ngOnDestroy() {
    this.deleteSubject.next(); // Emite un valor en el sujeto de finalización para cancelar cualquier suscripción pendiente
    this.deleteSubject.complete(); // Completa el sujeto de finalización
  }

  /**
   * Obtiene un Observable que emite un valor cuando se elimina un elemento.
   * @returns Un Observable que emite eventos de eliminación.
   */
  getDeleteObservable(): Observable<void> {
    return this.deleteSubject.asObservable();
  }

  /**
   * Guarda un elemento en la base de datos
   * @param route La ruta de la API para realizar la operación de guardado.
   * @param data Los datos a guardar.
   * @returns Un Observable que emite el elemento guardado o un error si la solicitud falla.
   */
  save(route: string, data: any): Observable<any> {
    return this.api.post(`${route}`, data).pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || error.error.sqlMessage || 'Something went wrong. Try again.' });
        return throwError(error);
      })
    );
  }

  /**
   * Actualiza un elemento en la base de datos.
   * @param route La ruta de la API para realizar la operación de actualización.
   * @param data Los datos a actualizar.
   * @returns Un Observable que emite el elemento actualizado o un error si la solicitud falla.
   */
  update(route: string, data: any): Observable<any> {
    return this.api.put(`crud/${route}`, data).pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || error.error.sqlMessage || 'Something went wrong. Try again.' });
        return throwError(error);
      })
    );
  }

  /**
   * Obtiene una lista de elementos de la base de datos sin el ID del inquilino.
   * @param route La ruta de la API para obtener la lista.
   * @returns Un Observable que emite la lista de elementos o un error si la solicitud falla.
   */
  getList(route: string) {
    return this.api.get(route).pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || error.error.sqlMessage || 'Something went wrong. Try again.' });
        return throwError(error);
      })
    );
  }
  
  /**
   * Muestra un cuadro de diálogo de confirmación antes de eliminar un elemento.
   * @param item El elemento a eliminar.
   * @param route La ruta de la API para realizar la eliminación.
   */
  confirmDelete(item: any, route: string) {
    this.fun.presentConfirm(e => {
      if (e) {
        this.delete(item, route);
      }
    }, 'Confirm Delete');
  }

  /**
   * Elimina un elemento de la base de datos.
   * @param item El elemento a eliminar.
   * @param route La ruta de la API para realizar la eliminación.
   */
  delete(item: any, route: string) {
    this.api.delete(`crud/${route}/${item.id}`).pipe(
      takeUntil(this.deleteSubject), // Cancela la solicitud si el sujeto de finalización emite un valor
      tap(() => this.deleteSubject.next()) // Emite el evento de eliminación
    ).subscribe({
      complete: () => {},
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || error.error.sqlMessage || 'Something went wrong. Try again.' });
      },
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully!' });
        return;
      },
    });
  }

  /**
   * Muestra un cuadro de diálogo de confirmación antes de eliminar todos los elementos de una tabla.
   * @param route La ruta de la API para realizar la eliminación.
   */
  confirmDeleteAll(route: string) {
    this.fun.presentConfirm(e => {
      if (e) {
        this.deleteAll(route);
      }
    }, 'Confirm Delete All');
  }

  /**
   * Elimina todos los elementos de una tabla de la base de datos.
   * @param route La ruta de la API para realizar la eliminación.
   */
  deleteAll(route: string) {
    this.api.delete(`crud/${route}`).pipe(
      takeUntil(this.deleteSubject), // Cancela la solicitud si el sujeto de finalización emite un valor
      tap(() => this.deleteSubject.next()) // Emite el evento de eliminación
    ).subscribe({
      complete: () => {},
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || error.error.sqlMessage || 'Something went wrong. Try again.' });
      },
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully!' });
      },
    });
  }

}
