import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Todos } from 'src/app/Todos';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { Question } from 'src/app/question';
import { EnrollService } from 'src/app/Services/enroll.services';
import { Router } from '@angular/router';
import { ApiServicecallService } from 'src/app/api-servicecall.service';
import { FlashMessageService } from 'src/app/flash-message.service';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})

export class AddTodoComponent implements OnInit{


Incompleted() {
  var jsonArray = localStorage.getItem("questionList");
  if(jsonArray!=null){
    var jsonArray2 = JSON.parse(jsonArray);
    this.questionarr = jsonArray2.filter((Question: { completed: boolean; }) => Question.completed==false);
  }
}
  @ViewChildren('myButton') myButton: QueryList<ElementRef>;

  searchValue:string;
  valuesend:string;
  title = 'my-todo-app';
  retval:number=1;

  // constructor(private apiservice:ApiServicecallService){
  //      this.retval=this.apiservice.getRetval();
  //      console.log(this.retval);
  // }
  v=0;
  badgevisible = false;
  
  badgevisibility() {
    this.badgevisible = true;
  }
  valueSearch(){
    this.valuesend = this.searchValue;
  }
   
   toggled:any;
   tm:any=1;
   questionarr:any[]=[
    
   ]
   ngAfterViewInit() {
    // Ensure that myButton is defined after the view has been initialized
    
  }
  
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
  messages:any="";
   constructor(private matDial:MatDialog,private apiServicecall:ApiServicecallService,private enrollService:EnrollService,private router:Router,private flashmessageservice:FlashMessageService,private dataService:DataServiceService){
       
       let value = this.getToken();
      //  console.log("VALUE IS "+value);
       if(value=="not available"){
        alert("Session Expired!! Login Again");
        this.router.navigate(['/']);
        return;
       }
            
        apiServicecall.getallqs().subscribe({
          next:(response:Question[])=>{
               
              //  console.log(response[0].name);
               this.questionarr=response;
               let arr=[];
               for(let i=0;i<this.questionarr.length;i++){
                   arr.push(this.questionarr[i]);
               }
               localStorage.setItem("questionList",JSON.stringify(arr));
          },error:(err)=>{
                   alert("Either Logged out or Loading questions Issues,login again!");
                   localStorage.removeItem('token');
                   this.router.navigate(['/']);
          }
        });
//       }else{
            


//           // Assuming jsonArray is the array of objects obtained from localStorage
// var jsonStringArray = localStorage.getItem("questionList");

// // Check if jsonStringArray is not null before parsing
// if (jsonStringArray !== null) {
//     var jsonArray = JSON.parse(jsonStringArray);

//     // Loop through each object in the array
//     for (var i = 0; i < jsonArray.length; i++) {
//         var currentObject = jsonArray[i];
//         this.questionarr.push(currentObject);
//         // Now you can access properties of the current object
//         // console.log("ID: " + currentObject.id);
//         // console.log("Name: " + currentObject.name);
//         // console.log("URL: " + currentObject.url);
//         // console.log("Liked: " + currentObject.liked);
//         // console.log("NumUpvotes: " + currentObject.numupvotes);
//         // console.log("NumDownvotes: " + currentObject.numDownvotes);
//         // console.log("Rating: " + currentObject.rating);
//         // console.log("Completed: " + currentObject.completed);
//         // console.log("--------------");
//     }
// } else {
//     console.log("No data found in localStorage");
// }


          //  console.log(localStorage.getItem("questionList"))
             
              // console.log(result[i]);
                  // this.questionarr.push(res[i]);
            
          //  for(let i=0;i<res.length;i++){
          //   console.log(res[i]);
          //       // this.questionarr.push(JSON.parse(result[i]));
          //  }
          
      // }
        this.messages=this.flashmessageservice.getMessages();
       
        this.flashmessageservice.clearMessages();
   }
   
   
   
   markCompleted(id: any, event: any) {
    console.log("id of question is " + id);
    const question = this.questionarr.find(q => q.id === id);

    if (question) {
        const completed = !question.completed;
        this.apiServicecall.updatetocompleted(id, completed).subscribe({
            next: (response:any) => {
                console.log(response);
                question.completed = completed; // Update the completed property based on the API response
                let arr = [];
                for (let i = 0; i < this.questionarr.length; i++) {
                    arr.push(this.questionarr[i]);
                }
                localStorage.setItem("questionList", JSON.stringify(arr));
            },
            error: (err:any) => {
                console.log(err);
            }
        });
    }
}

  

  ngOnInit(): void {
    this.dataService.data$.subscribe((data) => {
      this.questionarr = data;
    });
    // console.log(this.items);
  }
  //  data = {
  //   questionname: ''
  // };
  // openDialog(questionname:any){
  //   this.data.questionname=questionname;
  //   this.matDial.open(DialogBodyComponent,{
  //     width:'500px',
  //     data:this.data
  //   });
  // }
  thumbup(id:any){
     
     for(let i=0;i<this.questionarr.length;i++){
           if(this.questionarr[i].id == id){
                this.questionarr[i].liked=!this.questionarr[i].liked;
           }
     }
     let arr=[];
     for(let i=0;i<this.questionarr.length;i++){
         arr.push(this.questionarr[i]);
     }
     localStorage.setItem("questionList",JSON.stringify(arr));
     this.apiServicecall.likedqs(id).subscribe({
      next:(response)=>{
          // console.log(response);
      },error:(err)=>{
          console.log(err);
      }
     });
  }
  
  IncrementRating(item:any){
    // console.log(item);
    // this.items[item].rating++;
    // this.items.sort((a:any, b:any) => (b.rating-a.rating));
  }
  
  upvoted(id:any){
      this.apiServicecall.upvote(id).subscribe({
        next:(response)=>{
          // console.log(response);
          let name = response.name;
          for(let i=0;i<this.questionarr.length;i++){
            if(this.questionarr[i].name===name){
              this.questionarr[i].numupvotes++;
            }
          }
          let arr=[];
          for(let i=0;i<this.questionarr.length;i++){
              arr.push(this.questionarr[i]);
          }
          localStorage.setItem("questionList",JSON.stringify(arr));
        
        },error:(err)=>{
          console.log(err);
        }
      });
      
  }
  downvoted(id:any){

    this.apiServicecall.downvote(id).subscribe({
      next:(response)=>{
        // console.log(response);
        let name = response.name;
        for(let i=0;i<this.questionarr.length;i++){
          if(this.questionarr[i].name===name){
            this.questionarr[i].numDownvotes++;
          }
        }
        let arr=[];
        for(let i=0;i<this.questionarr.length;i++){
            arr.push(this.questionarr[i]);
        }
        localStorage.setItem("questionList",JSON.stringify(arr));
       
      },error:(err)=>{
        console.log(err);
      }
    });
    
  }
  searchfield:string="";
  Search(){
    this.searchfield=this.searchfield.toLowerCase();
    var jsonArray = localStorage.getItem("questionList");
    if(jsonArray!=null){
      var jsonArray2 = JSON.parse(jsonArray);
      this.questionarr = jsonArray2.filter((Question: { name: string; }) => Question.name.toLowerCase().indexOf(this.searchfield)!=-1);
    }
    // console.log(this.questionarr);
    
    // this.apiServicecall.getallqs().subscribe({
    //   next:(response:Question[])=>{
    //        console.log(response[0].name);
    //        this.questionarr=response;
    //        this.questionarr=this.questionarr.filter(Question => Question.name.toLowerCase().indexOf(this.searchfield)!=-1);
           
           
    //       //  for(let i=0;i<response.length;i++){
    //       //     if(response[i].name.toLowerCase().indexOf)
    //       //  }
    //       //  this.questionarr.sort((a:any, b:any) => (b.numupvotes-a.numupvotes)); 
    //   },error:(err)=>{
    //     alert("Error fetching Questions");
    //      return;
    //   }
    //  });
      // console.log(this.searchfield);
      
  }
  scorecard(){
    this.router.navigate(['/score'])
  }
  DecrementRating(item:any){
    // this.items[item].rating--;
    // this.items.sort((a:any, b:any) => (a.rating > b.rating ? -1 : 1));
  }
  MarkDone(i:any){
      // let item=this.items[i];
      let x=i;
      // for(;x<this.items.length-1;x=x+1){
          // this.items[x]=this.items[x+1];
      // }
      // this.items[x]=item;
  }
  SortRatings(){
    var jsonArray = localStorage.getItem("questionList");
    if(jsonArray!=null){
      var jsonArray2 = JSON.parse(jsonArray);
      this.questionarr = jsonArray2.sort((a:any,b:any) => (b.numupvotes-a.numupvotes));
    }
   
    // this.apiServicecall.getallqs().subscribe({
    //   next:(response:Question[])=>{
    //        console.log(response[0].name);
    //        this.questionarr=response;
    //        this.questionarr.sort((a:any, b:any) => (b.numupvotes-a.numupvotes)); 
    //        let arr=[];
    //        for(let i=0;i<this.questionarr.length;i++){
    //            arr.push(this.questionarr[i]);
    //        }
    //        localStorage.setItem("questionList",JSON.stringify(arr));
    //   },error:(err)=>{
    //     alert("Error fetching Questions");
    //      return;
    //   }
    //  });
   
  }
  completed(){
    var jsonArray = localStorage.getItem("questionList");
    if(jsonArray!=null){
      var jsonArray2 = JSON.parse(jsonArray);
      this.questionarr = jsonArray2.filter((Question: { completed: boolean; }) => Question.completed==true);
    }
   
    // this.apiServicecall.getallqs().subscribe({
    //   next:(response:Question[])=>{
    //        console.log(response[0].name);
    //        this.questionarr=response;
    //        this.questionarr = this.questionarr.filter(Question => Question.completed==true);
    //        let arr=[];
    //        for(let i=0;i<this.questionarr.length;i++){
    //            arr.push(this.questionarr[i]);
    //        }
    //        localStorage.setItem("questionList",JSON.stringify(arr));
    //   },error:(err)=>{
    //     alert("Error fetching Questions");
    //      return;
    //   }
    //  });
   

  }
  
  LowRatings(){
    var jsonArray = localStorage.getItem("questionList");
    if(jsonArray!=null){
      var jsonArray2 = JSON.parse(jsonArray);
      this.questionarr = jsonArray2.sort((a:any,b:any) => (a.numupvotes-b.numupvotes));
    }
    
    // this.apiServicecall.getallqs().subscribe({
    //   next:(response:Question[])=>{
    //        console.log(response[0].name);
    //        this.questionarr=response;
    //        this.questionarr.sort((a:any, b:any) => (a.numupvotes-b.numupvotes)); 
    //        let arr=[];
    //        for(let i=0;i<this.questionarr.length;i++){
    //            arr.push(this.questionarr[i]);
    //        }
    //        localStorage.setItem("questionList",JSON.stringify(arr));
    //   },error:(err)=>{
    //     alert("Error fetching Questions");
    //      return;
    //   }
    //  });
  }
}
