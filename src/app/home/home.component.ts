import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  longText = `Public-access television is traditionally a form of non-commercial mass media where the general public can create content television programming which is narrowcast through cable television specialty channels. Public-access television was created in the United States between 1969 and 1971 by the Federal Communications Commission (FCC), under Chairman Dean Burch, based on pioneering work and advocacy of George Stoney, Red Burns (Alternate Media Center),[1] and Sidney Dean (City Club of NY).`;
  
  mlbNewsApi: any;
  mlbNews: any;
  nflNewsApi: any;
  nflNews: any;

  allNews: any;

  constructor() { }

  ngOnInit(): void {
    
    this.combineNews()
    
  }


   randomize(a: any, b: any) {
    return Math.random() - 0.5;
  }


  async getMlbNewsApi(){
    let resp = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news');

    if(resp.ok){
      this.mlbNewsApi = await resp.json();
    }

    this.mlbNews = this.mlbNewsApi;
    

  }

  async getNflNewsApi(){
    let resp = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/news');

    if(resp.ok){
      this.nflNewsApi = await resp.json();
    }

    this.nflNews = this.nflNewsApi;
    
  }


  async combineNews(){

    await this.getMlbNewsApi()
    await this.getNflNewsApi()

    console.log(this.mlbNews)
    console.log(this.nflNews)

    this.mlbNews.articles = this.mlbNews.articles.concat(this.nflNews.articles);

    this.allNews = this.mlbNews;

    console.log(this.mlbNews.articles.sort(this.randomize))

  }


  /**
 * OPEN ESPN TEAM LINKS IN NEW POPUP
 * @param url 
 */
   open(url: any, title: any, w: any, h: any){
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  }
}
