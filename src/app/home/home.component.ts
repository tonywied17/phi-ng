import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  longText = `Public-access television is traditionally a form of non-commercial mass media where the general public can create content television programming which is narrowcast through cable television specialty channels. Public-access television was created in the United States between 1969 and 1971 by the Federal Communications Commission (FCC), under Chairman Dean Burch, based on pioneering work and advocacy of George Stoney, Red Burns (Alternate Media Center),[1] and Sidney Dean (City Club of NY).`;
  constructor() { }

  ngOnInit(): void {
  }

}
