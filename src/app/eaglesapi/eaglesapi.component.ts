import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eaglesapi',
  templateUrl: './eaglesapi.component.html',
  styleUrls: ['./eaglesapi.component.scss']
})
export class EaglesapiComponent implements OnInit {

  /**
   * Variables and Properties
   */
  eagles: any;
  teamApi: any;
  scoreApi: any;
  eventApi: any

  constructor() { }

  ngOnInit(): void {
    
      this.mergeEaglesApi();
    
  }

  /**
   * API GET REQUEST FROM ESPN FOR TEAM
   * Store that repsonse in the teamApi object.
   */
  async getEaglesTeamApi(){
    let resp = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/21');

    if(resp.ok){
      this.teamApi = await resp.json();
    }
  }


   /**
   * API GET REQUEST FROM ESPN FOR SCORES
   * Filter only the event entry that contains PHI in the matchup then store that in the eventApi object
   */
  async getEaglesScoreApi(){
    let resp = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');

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
  async mergeEaglesApi(){

    await this.getEaglesTeamApi();
    await this.getEaglesScoreApi();

        this.eagles = {
          ...this.teamApi,
          ...this.eventApi
        };

    console.log(JSON.stringify(this.eagles))
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
