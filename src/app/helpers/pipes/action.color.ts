import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
   name : 'actionColor'
})
export class AdvisePipe implements PipeTransform {
   transform(val : string) : string {
     switch(val){
         case "SELL":
             return "green"
             break;
        case "HOLD":
            return "red";
            break;            
         default:
            return "green";
            break;

     }
   }
 
}