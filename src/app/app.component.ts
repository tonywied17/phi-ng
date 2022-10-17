import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Retrieve the current password on intialization
  ngOnInit(): void {
    this.getCreds()
  }

  //An assortment of variables for this component
  bodyTag = document.body;
  input: any;
  title = 'molexee';
  authed = false;
  hide = true;
  pass: any;

  /**
   * MAIN THEME TOGGLE
   * Used to apply the main theme from the app componenent
  */
  mainTheme() {
    this.bodyTag.classList.remove(this.bodyTag.classList.toString())
    this.bodyTag.classList.add("main");
  }

  loginForm = new FormGroup({
    password: new FormControl('')
  })  

  /**
   * AUTHORIZATION LISTENER
   * While a user is typing the auth password listen for each
   * typed character and once it matches store the auth verification
   * in the users local storage.
   * 
   * @param e - the current value of the password textbox
   */
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

  /**
   * GET AUTHORIZATION
   * Fetch the current password from by fetching the streamAuth.json
   * file and if the password in users localStorage matches then grant
   * access to the application.
   */
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

  /**
   * RANDOM NUMBER
   * @returns a random number
   */
  rando(){
    return Math.floor(Math.random() * 100000);
  }

}
