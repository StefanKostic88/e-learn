import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'generateInputs',
  standalone: true,
})
export class GenerateInputsPipe implements PipeTransform {
  transform(formGrop: FormGroup): any[] {
    return Object.entries(formGrop.controls).map((el) => {
      console.log('GENERATE INPUTS');
      const name = (el[0] as string)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return {
        formControlName: el[0],
        labelName: name,
        inputType: 'password',
        placeholderText:
          name !== 'Confirm New Password'
            ? `Enter ${name}`
            : 'Confirm New Password',
      };
    });
  }
}
