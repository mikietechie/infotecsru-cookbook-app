import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username',
})
export class UsernamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.split('@')[0];
  }
}
