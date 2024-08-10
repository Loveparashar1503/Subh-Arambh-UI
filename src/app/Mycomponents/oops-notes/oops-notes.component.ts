import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicecallService } from 'src/app/api-servicecall.service';

@Component({
  selector: 'app-oops-notes',
  templateUrl: './oops-notes.component.html',
  styleUrls: ['./oops-notes.component.css']
})
export class OopsNotesComponent {
 
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
  constructor(private apiService:ApiServicecallService,private router:Router){
    
      let value = this.getToken();
         console.log("VALUE IS "+value);
         if(value=="not available"){
          alert("Session Expired!! Login Again");
          this.router.navigate(['/']);
          return;
         }
    
  }
  
 
  deleteUser(){
      this.apiService.deleteUser().subscribe({
        next:(response)=>{
          alert("Hey Your ID deleted SuccessFully!")
          localStorage.removeItem('token');
            this.router.navigate(['/login'])
        },error:(err)=>{
          console.log(err);
        }
      });
  }

}
