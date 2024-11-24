import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alias',
})
export class AliasPipe implements PipeTransform {
  transform(
    value: string,
    aliases: { [key: string]: string },
    key: string
  ): string {
    if (!aliases || !key) return value;
    return aliases[key] || value;
  }
}
