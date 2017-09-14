import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string, arg1: string, arg2: string) {
        debugger
        let locval = value;
        if (input) {            
            input = input.toLowerCase();
            locval = locval.filter(function (el: any) {
                return el.Username.toLowerCase().indexOf(input) > -1;
            })
        }

        if(arg1)
        {            
           return locval.filter(function (el:any){
                return el.Name.toLowerCase().indexOf(arg1) > -1;
           })
        }

        if(arg2)
        {            
           return locval.filter(function (el:any){
                return el.LastName.toLowerCase().indexOf(arg2) > -1;
           })
        }
        return locval;
    }
}