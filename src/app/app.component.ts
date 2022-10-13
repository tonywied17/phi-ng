import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    this.getCreds()
  }

  bodyTag = document.body;
  input: any;
  title = 'molexee';
  authed = false;
  hide = true;
  pass: any;

  // 

  mainTheme() {
    this.bodyTag.classList.remove(this.bodyTag.classList.toString())
    this.bodyTag.classList.add("main");
  }

  loginForm = new FormGroup({
    password: new FormControl('')
  })  

  async getAuth(e: any){

    e.preventDefault()
    this.input = this.loginForm.value.password

    if(this.input == this.pass){
      this.authed = true;
      localStorage.setItem('auth', this.pass)
    }else{
      this.authed = false
    }
  }

  async getCreds(){

    let storedCreds = localStorage.getItem('auth') ? localStorage.getItem('auth') : null;
    let resp = await fetch('https://molex.cloud/phi/streamAuth.json?' + this.rando());

    if(resp.ok){
      let json = await resp.json();
      
      if(storedCreds == json.creds){
        this.pass = storedCreds;
        this.authed = true
      }

      this.pass = json.creds

    }
  }

  rando(){
    return Math.floor(Math.random() * 100000);
  }

}
