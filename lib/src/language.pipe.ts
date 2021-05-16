import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language',
})
export class LanguagePipe implements PipeTransform {

  transform(value: string, language: string): string {
    if (value == null) {
      value = '';
    }
    if (language == null) {
      language = '';
    }
    if (typeof value !== 'string') {
      console.error(`LanguagePipe has been invoked with an invalid value type [${typeof value}]`);
      return value;
    }
    if (typeof language !== 'string') {
      console.error(`LanguagePipe has been invoked with an invalid parameter [${typeof language}]`);
      return value;
    }
    return '```' + language + '\n' +  value + '\n```';
  }
}
