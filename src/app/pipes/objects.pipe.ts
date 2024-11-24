import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objects',
})
export class ObjectsPipe implements PipeTransform {
  transform(value: any): { key: string; val: any }[] {
    if (!value || typeof value !== 'object') return [];
    return Object.keys(value).map((key) => ({ key, val: value[key] }));
  }
}
