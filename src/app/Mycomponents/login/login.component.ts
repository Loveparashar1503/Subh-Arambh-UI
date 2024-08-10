import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicecallService } from 'src/app/api-servicecall.service';
import { Authlogin } from 'src/app/authlogin';
import { FlashMessageService } from 'src/app/flash-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('password') password:ElementRef<any>;
  v:any=0;
  messages: any[] = [];
  user:Authlogin={
    username:'',
    password:''
  }
  media:any=false;
  mobileMedia:any=window.matchMedia("(max-width:520px)");

  constructor(private apiserviceCall:ApiServicecallService,private router:Router,private flashmessageservice:FlashMessageService){
    
    // this.flashmessageservice.addMessage('Welcome to Login Page!');
    if(this.mobileMedia.matches){
       this.media=true;
    }
    
    // console.log("messages is "+this.messages);
    
    // if(this.messages=="" || this.messages==null){
    //   this.flashmessageservice.addMessage('Welcome to Login Page!');
    // }
    this.messages=this.flashmessageservice.getMessages();
    if(this.messages.length==0){
      this.flashmessageservice.addMessage('Welcome to Login Page!');
    }
    this.messages=this.flashmessageservice.getMessages();
    this.flashmessageservice.clearMessages();
  }
  
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailValidation(email:any){
      var ok = this.emailRegex.test(email);
      return ok;
  }
  Password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!_%*#?&]{8,}$/;
  passwordValidation(password:any){
        var ok = this.Password.test(password);
        return ok;
  }
  setToken(token:any, expirationTimeInSeconds:any) {
    const currentTime = Date.now();
    const expirationTimestamp = currentTime + expirationTimeInSeconds * 100000;
  
    const tokenData = {
      value: token,
      expirationTimestamp: expirationTimestamp,
    };
  
    localStorage.setItem('token', JSON.stringify(tokenData));
  }
  submitForm(){
    // console.log("done");
    let resp={
      jwtToken:"",
      username:""
    }
    // console.log("PASSWORD IS "+this.password.nativeElement.value);
    if(this.emailValidation(this.user.username)){
      let loggedIn=false;

          if(this.passwordValidation(this.user.password)){
              this.apiserviceCall.callLogin(this.user).subscribe({
              next:(response:any)=>{
                // console.log(response);
                this.apiserviceCall.setRetval(0);
                resp=response;
               
                let mssg="";
                if(response.jwtToken==="Invalid Password"){
                    mssg="Invalid Password,Please check before entering!";
                    this.v=1;
                    this.flashmessageservice.addMessage(mssg);
                    this.messages=this.flashmessageservice.getMessages();
                    this.flashmessageservice.clearMessages();
                    this.password.nativeElement.value='';
                }else if(response.jwtToken==="Invalid UserName"){
                  mssg="Invalid Username,Please check before entering!  or Sign Up First";
                  // console.log("HIIIIIIIIIIIIIIIIII");
                  this.v=1;
                  this.flashmessageservice.clearMessages();
                  this.flashmessageservice.addMessage(mssg);
                  this.messages=this.flashmessageservice.getMessages();
                  // console.log(this.messages);
                  this.flashmessageservice.clearMessages();
                }else{
                  mssg="Logged In SuccessFully!!!";
                  this.setToken(resp.jwtToken,1000);
                  this.flashmessageservice.addMessage(mssg);
                  this.messages=this.flashmessageservice.getMessages();
                  // this.flashmessageservice.clearMessages();
                  loggedIn=true;
                  this.router.navigate(['/main']);
                }
                // localStorage.setItem('token',resp.jwtToken);
                
                // this.apiserviceCall.setToken(response.jwtToken);
                
                
                
              },error:(err)=>{
                this.v=1;
                this.flashmessageservice.addMessage('Something Went Wrong, Unable to Login X');
                this.messages=this.flashmessageservice.getMessages();
                this.flashmessageservice.clearMessages();
                console.log(err);
              }
              });
             
          }else{

            alert("Password should contain at least one letter, one number, and is at least 8 characters long.");
            return;
          } 
    }else{
      this.v=1;
      this.flashmessageservice.clearMessages();
      this.flashmessageservice.addMessage('Wrong Email Address, Email should be correct!');
      this.messages=this.flashmessageservice.getMessages();
      // console.log("messages in error is "+this.messages);
      this.flashmessageservice.clearMessages();
        // alert("Wrong Email Address, Email should be correct!!");
        return;
    }
     
  }

}
