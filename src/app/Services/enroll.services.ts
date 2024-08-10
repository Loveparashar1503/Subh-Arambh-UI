import { Injectable } from "@angular/core";
import { Question } from "../question";
// import { LikedQuestionsComponent } from "../Mycomponents/liked-questions/liked-questions.component";
@Injectable({
       providedIn:'root',
       
})
export class EnrollService{
       constructor(){
             
       }
       list:any;
       setMessage(list:any){
              console.log(list);
              this.list=list;
       }
       getMessage(){
              return this.list;
       }
       
      
       
}


