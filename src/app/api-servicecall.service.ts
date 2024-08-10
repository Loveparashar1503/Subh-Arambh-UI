import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Question } from './question';
import { Votes } from './votes';
import { Profile } from './profile';
// import { BASE_URL } from 'src/config';
import baseurl from 'src/helper';

@Injectable({
  providedIn: 'root'
})
export class ApiServicecallService {
  // private apiUrl = `${BASE_URL}/`;
  downvote(id: any) {
    // let token="Bearer "+localStorage.getItem('token');
    let gettoken = this.getToken();
    let token="Bearer "+gettoken;
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.httpclient.get<Votes>(`${baseurl}/product/downvote?qid=${id}`,httpOptions);
  }
  getAverage(){
    let gettoken = this.getToken();
    let token="Bearer "+gettoken;
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.httpclient.get<number>(`${baseurl}/product/averageMarked`,httpOptions);
  }
  getTopusers(){
    let gettoken = this.getToken();
    let token="Bearer "+gettoken;
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.httpclient.get<Profile[]>(`${baseurl}/product/listofTopscorers`,httpOptions);
  }
  upvote(id:any) {
    // let token="Bearer "+localStorage.getItem('token');
    let gettoken = this.getToken();
    let token="Bearer "+gettoken;
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.httpclient.get<Votes>(`${baseurl}/product/upvote?qid=${id}`,httpOptions);
  }

  constructor(private httpclient:HttpClient,private cookieService: CookieService) { }
  val:any=9;
  token="";
  
  callSignup(user:any){
      return this.httpclient.post(`${baseurl}/product/signup`,user);
  }
  setRetval(val:any){
       this.val=val;
  }
  getRetval(){
    return this.val;
  }
  callLogin(user:any){
    return this.httpclient.post(`${baseurl}/product/authenticate`,user);
  }
  callHero(dialogbox:any){
    // let token="Bearer "+localStorage.getItem('token');
    let gettoken = this.getToken();
    let token="Bearer "+gettoken;
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Origin": "*"
      })
    };
    // this.cookieService.set('Authorization', token, undefined, '/', 'localhost', true, 'None');
    console.log('httpOptions:', httpOptions);
    // console.log(this.cookieService.get("Authorization"));
      // let headers = new HttpHeaders();
      // headers.append("Authorization","Bearer "+localStorage.getItem("token"));
      return this.httpclient.post(`${baseurl}/product/hero`,dialogbox,httpOptions);
  }
  updatetocompleted(qid: any, completed: boolean) {
    const gettoken = this.getToken();
    const token = "Bearer " + gettoken;

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token,
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Access-Control-Allow-Origin": "*"
        })
    };

    return this.httpclient.get(`${baseurl}/product/questioncompleted?qid=${qid}&completed=${completed}`, httpOptions);
}

  // updatetocompleted(qid:any,completed: boolean){
  //   // let token="Bearer "+localStorage.getItem('token');
  //   let gettoken = this.getToken();
  //   let token="Bearer "+gettoken;
  //   // console.log(token);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': token,
  //       "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
  //       "Access-Control-Allow-Origin": "*"
  //     })
  //   };
  //         return this.httpclient.get(`${baseurl}/product/questioncompleted?qid=${qid}`,httpOptions);
  // }
  deleteUser(){
    // let token="Bearer "+localStorage.getItem('token');
    let gettoken = this.getToken();
    let token="Bearer "+gettoken;
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.httpclient.get(`${baseurl}/product/delete`,httpOptions);
  }
  likedqs(id:any){
    // let token="Bearer "+localStorage.getItem('token');
    let gettoken = this.getToken();
    let token="Bearer "+gettoken;
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.httpclient.get(`${baseurl}/product/like?id=${id}`,httpOptions);
  }
  fetchAllLikedqs(){
    // let token="Bearer "+localStorage.getItem('token');
    let gettoken = this.getToken();
    let token="Bearer "+gettoken;
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.httpclient.get<Question[]>(`${baseurl}/product/likedquestions`,httpOptions);
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
      }
    }
  }
  callForgotPassword(email:string){
    // let gettoken = this.getToken();
    // let token="Bearer "+gettoken;
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Origin": "*"
      })
    };
    let url = '/product/forgotpassword?email='+email;
    return this.httpclient.get(`${baseurl}/product/forgotpass?email=${email}`,httpOptions);
  }
  getallqs()
  {
    let gettoken = this.getToken();
    let token="Bearer "+gettoken;
    // console.log("TOKEN IS ++++ "+token);
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With"
        // "Access-Control-Allow-Origin": "*"
      })
    };
    return this.httpclient.get<Question[]>(`${baseurl}/product/getAllQuestions`,httpOptions);
  }

  TokenExpired(){
    let token="Bearer "+localStorage.getItem('token');
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.httpclient.get<String>(`${baseurl}/product/tokenExpired?token=${token}`,httpOptions);
  }
  
}
