import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-analysis',
  templateUrl: './company-analysis.component.html',
  styleUrls: ['./company-analysis.component.css']
})
export class CompanyAnalysisComponent {
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
  constructor(private router:Router){
    let value = this.getToken();
      //  console.log("VALUE IS "+value);
       if(value=="not available"){
        alert("Session Expired!! Login Again");
        this.router.navigate(['/']);
        return;
       }
  }

}
