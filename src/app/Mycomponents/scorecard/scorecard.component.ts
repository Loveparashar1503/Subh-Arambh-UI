import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
// import { Label } from 'ng2-charts';
// import { MultiDataSet } from 'ng2-charts';
import Chart from 'chart.js/auto';
import { ApiServicecallService } from 'src/app/api-servicecall.service';
import { Profile } from 'src/app/profile';
import { Question } from 'src/app/question';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {
  
  score:any=0;
  totalAverage:any=0;
  questionarr:any=[];
  profilearr:any=[];
  rank:number=0;
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
  constructor(private router:Router,private apiServicecall:ApiServicecallService){

    let value = this.getToken();
      //  console.log("VALUE IS "+value);
       if(value=="not available"){
        alert("Session Expired!! Login Again");
        this.router.navigate(['/']);
        return;
       }
       if(localStorage.getItem("questionList")!=null){
        var jsonArrays = localStorage.getItem("questionList");
        if(jsonArrays!=null){
          var jsonArr = JSON.parse(jsonArrays);
          let sc=0;
          for(let i=0;i<jsonArr.length;i++){
            if(jsonArr[i].completed==true){
              sc++;
            }
          }
          this.score=sc;
          apiServicecall.getAverage().subscribe({
            next:(response:number)=>{
                this.totalAverage=response;
                // console.log(this.totalAverage);
                this.createChart();
            }
            });
       }
       }else{
       apiServicecall.getallqs().subscribe({
        next:(response:Question[])=>{
             let sc=0;
            //  console.log(response[0].name);
             this.questionarr=response;
             for(let i=0;i<this.questionarr.length;i++){
                if(this.questionarr[i].completed){
                    sc++;
                }
             }
             this.score=sc;
            //  console.log("score is "+this.score);
             apiServicecall.getAverage().subscribe({
              next:(response:number)=>{
                   this.totalAverage=response;
                  //  console.log(this.totalAverage);
                   this.createChart();
              }
            });
        },error:(err)=>{
                
                 localStorage.removeItem('token');
                 this.router.navigate(['/']);
        }
      });
    }

      apiServicecall.getTopusers().subscribe({
        next:(response:Profile[])=>{
            //  console.log(response);
             this.profilearr=response;
            //  console.log(response);
             for(let i=0;i<this.profilearr.length && i<10;i++){
              if(this.profilearr[i].name=="You"){
                   this.rank=i+1;
                   break;
              }
            }
            
            // console.log("this rank is "+this.rank);
        },error:(err)=>{
               console.log("Error: "+err);
        }
      });
      
      
  }
  scorechecker(){
     return this.score>0?false:true;
  }
  checkCondition(){
    if(this.profilearr.length>0)return true;
    return false;
  }
  ngOnInit(): void {
    
  }

  public chart: any;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Category 1', 'Category 2', 'Category 3'];
  // public pieChartData: number[] = 
  //   [30, 50, 20]
  // ;
  public pieChartData: any[] = [
    { data: [3.25, 5.0, 2.0], label: 'Categories' }
  ];
  
  
  // public pieChartData: number[] = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  createChart(){
    console.log("MY Score"+this.score);
    let num=this.score;
    num=0;
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Red - Average Score', 'Pink - Your Score','green - Total Questions'],
	       datasets: [{
    label: '',
    data: [this.totalAverage,this.score,100],
    backgroundColor: [
      'red',
      'pink',
      'green',
			// 'yellow',
      // 'orange',
      // 'blue',			
    ],
    hoverOffset: 2
  }],
      },
      options: {
        
        aspectRatio:num
      }

    });
  }

}
