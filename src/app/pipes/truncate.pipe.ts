import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  /**
   * Método para truncar un string a 8 caracteres y agregarle puntos suspensivos
   * @param value Valor a truncar
   * @returns Valor truncado
   */
  transform(value: string): string {
    if (value && value.length > 8) {
      return value.slice(0, 8) + '...';
    }
    return value;
  }

}
