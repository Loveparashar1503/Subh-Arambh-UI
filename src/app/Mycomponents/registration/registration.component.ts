import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServicecallService } from 'src/app/api-servicecall.service';
import { Registration } from 'src/app/registration';
import { NgToastService } from 'ng-angular-popup';
import { FlashMessageService } from 'src/app/flash-message.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user:Registration={
    fname:"",
    sname:"",
    email:"",
    linkedinprofile:"",
    password:""
  };
  messages:String[]=[];
  v=0;
  @ViewChild("button") signupbutton:ElementRef<any>;
  constructor(private apiserviceCall:ApiServicecallService,private router:Router,private toast:NgToastService,private flashmessageService:FlashMessageService){
            this.messages = this.flashmessageService.getMessages();
            if(this.messages.length==0){
              this.flashmessageService.addMessage("Welcome to Sign-Up Page!!");
            } 
            this.messages=this.flashmessageService.getMessages();
            
              this.flashmessageService.clearMessages();
          
  }


  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailValidation(email:any){
      var ok = this.emailRegex.test(email);
      return ok;
  }
  Password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*_#?&])[A-Za-z\d@$!_%*#?&]{8,}$/;
  passwordValidation(password:any){
        var ok = this.Password.test(password);
        return ok;
  }
  submitForm(){
    // console.log("done");
       if(this.emailValidation(this.user.email)){
             if(this.passwordValidation(this.user.password)){
                //  this.signupbutton.nativeElement.style.color="white";

                 this.apiserviceCall.callSignup(this.user).subscribe({
                  next:(response)=>{
                    // console.log(response);
                    this.apiserviceCall.setRetval(0);
                    this.flashmessageService.clearMessages();
                    this.flashmessageService.addMessage("Signed Up successFully, Now Login!");
                    this.router.navigate(['/login']);
                  },error:(err)=>{
                    console.log(err);
                  }
                 });
             }else{
                alert("Password should contain at least one letter,one special character, one number, and is at least 8 characters long.");
                return;
             } 
       }else{
           alert("Wrong Email Address, Email should be correct!!");
           return;
       }

  }
}
