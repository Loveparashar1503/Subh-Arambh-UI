import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicecallService } from 'src/app/api-servicecall.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { Subscription, interval } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ProgressBarService } from 'src/app/progress-bar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  
})
export class SettingsComponent implements OnInit{
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;
  
  
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
  constructor(private apiService:ApiServicecallService,private router:Router,private _formBuilder: FormBuilder,private progressbarService:ProgressBarService){
    let value = this.getToken();
    console.log("VALUE IS "+value);
    if(value=="not available"){
     alert("Session Expired!! Login Again");
     this.router.navigate(['/']);
     return;
    }
  }
  // progressBarValue=1;
  panelOpenState=false;
  progressBarValue = 0;
  private progressBarSubscription: Subscription;
  ngOnInit(): void {
    this.progressBarSubscription = this.progressbarService.progressBar$.subscribe(
      (value) => {
        this.progressBarValue = value;
      }
    );

    // Update the progress bar value every second (adjust interval as needed)
    interval(1000).subscribe(() => {
      // Your logic to calculate the new progress value goes here
      // For example, incrementing by 5 each second
      const newValue = this.progressBarValue + 1;
      const storedToken = localStorage.getItem('token');
      // Set the custom end value (adjust as needed)
      if(storedToken){
      const customEndValue = JSON.parse(storedToken).expirationTimestamp;
      // Ensure the value doesn't exceed the custom end value
      this.progressbarService.setEndValue(customEndValue-Date.now());
      
      this.progressbarService.updateProgressBar(Math.min(newValue, customEndValue));
      }
    });
  }
  
  deleteUser(){
      this.apiService.deleteUser().subscribe({
        next:(response)=>{
          alert("Hey Your ID deleted SuccessFully!")
          localStorage.removeItem('token');
          localStorage.removeItem("questionList");
            this.router.navigate(['/login']);
        },error:(err)=>{
          console.log(err);
        }
      });
  }
  changed(){
    console.log("changed");
  }
}
