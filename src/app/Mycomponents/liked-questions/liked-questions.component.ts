import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EnrollService } from 'src/app/Services/enroll.services';
import { ApiServicecallService } from 'src/app/api-servicecall.service';
import { Question } from 'src/app/question';

@Component({
  selector: 'app-liked-questions',
  templateUrl: './liked-questions.component.html',
  styleUrls: ['./liked-questions.component.css']
})
export class LikedQuestionsComponent {
      questionList:Question[]=[];
      question:any;
      
      getToken() {
        const storedToken = localStorage.getItem('token');
      
        if (storedToken) {
          const tokenData = JSON.parse(storedToken);
          const currentTime = Date.now();
      
          if (currentTime < tokenData.expirationTimestamp) {
            // Token is still valid
            return tokenData.value;
          } else {
            // Token has expired, handle accordingly (e.g., refresh token)
            // or clear the token from localStorage
            
            localStorage.removeItem('token');
            return "not available";
          }
        }
      }
      constructor(private apiServiceCall:ApiServicecallService,private router:Router){
       
          let value = this.getToken();
            //  console.log("VALUE IS "+value);
             if(value=="not available"){
              alert("Session Expired!! Login Again");
              this.router.navigate(['/']);
              return;
             }
             let arraystring = localStorage.getItem("questionList");
             this.questionList=[];
             if(arraystring!=null){
               var arrayobj = JSON.parse(arraystring);
               for(let i=0;i<arrayobj.length;i++){
                if(arrayobj[i].liked==true){
                  this.questionList.push(arrayobj[i]);
                }
               }
             }
      
          //  this.apiServiceCall.fetchAllLikedqs().subscribe({
          //   next:(response)=>{
          //       console.log(response);
          //       this.questionList=response;
          //   },error:(err)=>{
          //       console.log(err);
          //   }
          //  });
      }
      checkToDisplay(){
        if(this.questionList.length==0){
            return false;
        }
        return true;
      }
      thumbup(id:any){
        let arraystring = localStorage.getItem("questionList");
        if(arraystring!=null){
               var arrayobj = JSON.parse(arraystring);
               this.questionList=[];
               for(let i=0;i<arrayobj.length;i++){
                if(arrayobj[i].id==id){
                  arrayobj[i].liked=false;
                }
                if(arrayobj[i].liked==true)
                  this.questionList.push(arrayobj[i]);
               }
               localStorage.setItem("questionList",JSON.stringify(arrayobj));
        }
        

        // for(let i=0;i<this.questionList.length;i++){
        //       if(this.questionList[i].id == id){
        //            this.questionList[i].liked=!this.questionList[i].liked;
        //       }
        // }

        this.apiServiceCall.likedqs(id).subscribe({
         next:(response)=>{
            //  console.log(response);
            //  this.questionList = this.questionList.filter(Question => Question.id!=id);
         },error:(err)=>{
            //  console.log(err);
         }
        });
     }

      
}
