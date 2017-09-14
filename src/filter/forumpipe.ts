import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ForumPipe',
})
export class ForumPipe implements PipeTransform {
    transform(value: any, input: string, arg1: string, arg2: string) {
        debugger
        let locval = value;
        if (input) {            
            input = input.toLowerCase();
            locval = locval.filter(function (el: any) {
                return el.Name.toLowerCase().indexOf(input) > -1;
            })
        }

        if(arg1)
        {            
           return locval.filter(function (el:any){
                return el.Description.toLowerCase().indexOf(arg1) > -1;
           })
        }

        if(arg2)
        {            
           return locval.filter(function (el:any){
                var fullname = el.ResponsibleModerator.Name + ' ' + el.ResponsibleModerator.LastName;
                return fullname.toLowerCase().indexOf(arg2) > -1;
           })
        }
        return locval;
    }
}