import { Component, OnInit } from '@angular/core';
import { AboutCompany } from 'src/app/about-company';
import { ApiServicecallService } from 'src/app/api-servicecall.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit{
   ngOnInit(): void {
     
   }
   constructor(private dialogRef: MatDialogRef<DialogBodyComponent>,private apiServiceCall:ApiServicecallService,@Inject(MAT_DIALOG_DATA) public data: any){
  
   }
   dialogbox:AboutCompany={
     companyName: '',
     DescriptionInterview: '',
     linkedinProfile: '',
     questionname:''
   }
   

   
   saveChanges(){
      // console.log(this.CompanyName);
      // console.log(this.Description);
      // console.log(this.LinkedinURL);
      this.dialogbox.questionname=this.data.questionname;
      this.apiServiceCall.callHero(this.dialogbox).subscribe({
        next:(response:any)=>{
          console.log(response);
          // console.log(response.jwtToken);
          this.dialogRef.close();
          // this.apiserviceCall.setToken(response.jwtToken);
          // this.router.navigate(['/main']);
        },error:(err)=>{
          console.log(err);
        }
        });
   }
   
}
