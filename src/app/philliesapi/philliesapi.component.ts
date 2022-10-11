import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-philliesapi',
  templateUrl: './philliesapi.component.html',
  styleUrls: ['./philliesapi.component.scss']
})
export class PhilliesapiComponent implements OnInit {

/**
   * Variables and Properties
   */
 phillies: any;
 teamApi: any;
 scoreApi: any;
 eventApi: any

  constructor() { }

  ngOnInit(): void {
    this.mergephilliesApi();
  }


  /**
   * API GET REQUEST FROM ESPN FOR TEAM
   * Store that repsonse in the teamApi object.
   */
   async getphilliesTeamApi(){
    let resp = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/22');

    if(resp.ok){
      this.teamApi = await resp.json();
    }
  }


   /**
   * API GET REQUEST FROM ESPN FOR SCORES
   * Filter only the event entry that contains PHI in the matchup then store that in the eventApi object
   */
  async getphilliesScoreApi(){
    let resp = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');

    if(resp.ok){
      this.scoreApi = await resp.json();
      this.scoreApi.events.forEach((game: any) => {
        if(game.shortName.includes("PHI")){
          console.log(game)
          this.eventApi = game;
        }
      });
    }
  }


  /**
   * MERGE API REQUEST OBJECTS
   * You take the jawn on the left and the jawn on the right and make them all tight, hell yeah sheeeeeeeeeeesh
   */
  async mergephilliesApi(){

    await this.getphilliesTeamApi();
    await this.getphilliesScoreApi();

        this.phillies = {
          ...this.teamApi,
          ...this.eventApi
        };

    console.log(JSON.stringify(this.phillies))
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
