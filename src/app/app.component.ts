import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ApiServicecallService } from './api-servicecall.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from './flash-message.service';
import { DataServiceService } from './data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from './Mycomponents/feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  showDrawer = true;
  showToolbar = true;
  drawerMode:'side' | 'over' = 'side';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }
   checkforfield(){
      if(window.location.pathname=='/main'){
           return true;
      }
      return false;
   }
  private checkScreenSize(): void {
    this.showToolbar = window.innerWidth > 1000;

    // Close the drawer if the screen width is 520px or less
    if (window.innerWidth <= 1000) {
      this.showDrawer = false;
      this.drawerMode= 'over';
    }
  }

  toggleDrawer(): void {
    this.showDrawer = !this.showDrawer;
  }


  searchValue:string;
  valuesend:string;
  loggedIn:boolean=false;
  Token:string="";
  title = 'my-todo-app';
  @ViewChild('drawer') drawer: any;
  retval:number=1;
  mobileMedia:any=window.matchMedia("(max-width:520px)");
  constructor(private apiservice:ApiServicecallService,private router:Router,private flashservice:FlashMessageService,private dataService:DataServiceService,public dialog: MatDialog){
    // if(this.mobileMedia.matches){
    //   this.checker=true;
    //   // alert("media")
    //   // alert("Media matches");

    // }
    console.log("ROUTER url is "+this.router.url);
    if(window.location.pathname=='/' && localStorage.getItem('token') && localStorage.getItem('token')!="undefined"){
      this.router.navigate(['/main']);
    }
    if(localStorage.getItem('token') && localStorage.getItem('token')!="undefined"){
      
      this.loggedIn=true;
    }else{
      this.loggedIn=false;
    }
    var token= localStorage.getItem('token');
    // console.log("token is "+token);
    // if(token==null || token=="undefined")
    // {
    //   alert("Login session Expired please login Again!!");
    //   console.log("TOKEN IS "+token);
    //   this.router.navigate(['/login']);
    // }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '350px',
      data: { companyName: '', feedback: '', interviewDate: new Date() }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Handle the result here if needed
    });
  }
  
  // ngOnInit(){
  //   console.log("PATH is "+window.location.origin+window.location.pathname);
  //   if(this.router.url=='/login' && localStorage.getItem('token') && localStorage.getItem('token')!="undefined"){
  //     this.router.navigate(['/main']);
  //   }
  // }
 
  searchfield:string="";
  public questionarr:any=[];
  Search(){
  //  var jsonArr = localStorage.getItem("questionList");
  //  if(jsonArr!=null){
  //    var json = JSON.parse(jsonArr);
  //    for(let i=0;i<json.length;i++){
  //        this.questionarr.push(json[i]);
  //    }
  //  }
    this.searchfield=this.searchfield.toLowerCase();
    var jsonArray = localStorage.getItem("questionList");
    if(jsonArray!=null){
      var jsonArray2 = JSON.parse(jsonArray);
      this.questionarr = jsonArray2.filter((Question: { name: string; }) => Question.name.toLowerCase().indexOf(this.searchfield)!=-1);
    }
    console.log(this.questionarr);
    this.dataService.sendData(this.questionarr);
  }
  
  checkLoggedIn(){
     
    if(localStorage.getItem('token') && localStorage.getItem('token')!="undefined")return true;
    return false;
  }
  loginorsignup(){
    if(this.checkLoggedIn()==false){
        if(this.router.url=='/')return true;
    }
    return false;
  }
  checkSignUp()
  {
     if(this.checkLoggedIn()==false){
      if(this.router.url=='/login')return true;
     }
     return false;
  }
  v=1;
  logout(){
    localStorage.removeItem('token');
    console.log("ROYETR "+this.router.url);
    this.router.navigate(['/login']);
    this.flashservice.addMessage("Logged Out SuccessFully!");
  }
  Login(){
    this.router.navigate(['/login']);
  }
  SignUp(){
    this.router.navigate(['/']);
  }

  toggle(){
    this.drawer.toggle();
  }
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
  valueSearch(){
    this.valuesend = this.searchValue;
  }
  
}
