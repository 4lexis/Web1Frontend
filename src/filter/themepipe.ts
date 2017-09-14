import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ThemePipe',
})
export class ThemePipe implements PipeTransform {
    transform(value: any, input: string, arg1: string) {
        debugger
        let locval = value;
        if (input) {            
            input = input.toLowerCase();
            locval = locval.filter(function (el: any) {
                return el.Title.toLowerCase().indexOf(input) > -1;
            })
        }

        if(arg1)
        {            
           return locval.filter(function (el:any){
               var fullname = el.Author.Name + ' ' + el.Author.LastName;
                return fullname.toLowerCase().indexOf(arg1) > -1;
           })
        }
        
        return locval;
    }
}