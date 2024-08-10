import { Component, OnInit } from '@angular/core';
import * as monaco from 'monaco-editor';
import { ApiServicecallService } from 'src/app/api-servicecall.service';

@Component({
  selector: 'app-codeeditor',
  templateUrl: './codeeditor.component.html',
  styleUrls: ['./codeeditor.component.css']
})
export class CodeeditorComponent implements OnInit{
  editor: monaco.editor.IStandaloneCodeEditor;
  email:any='';
  mssg:any='';
  constructor(private service:ApiServicecallService){

  }
  ngOnInit() {
    // this.initMonaco();
  }
  submit(){
       if(this.email!=''){
          this.service.callForgotPassword(this.email).subscribe({
            next:(response:any)=>{
                 if(response.message[0]=='f'){
                          
                          this.mssg = response.message;
                 }else{
                    this.mssg="Sorry this Email is not found, Please Sign Up Again";
                 }
            }
          })
       }
  }
  // initMonaco() {
  //   this.editor = monaco.editor.create(<HTMLInputElement>document.getElementById('editor-container'), {
  //     value: 'console.log("Hello, World!");',
  //     language: 'javascript',
  //     theme: 'vs-dark',
  //   });
  // }

}
