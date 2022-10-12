import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'molexee';
  bodyTag = document.body;


  mainTheme(){
      this.bodyTag.classList.remove(this.bodyTag.classList.toString())
      this.bodyTag.classList.add("main");
  }
}
