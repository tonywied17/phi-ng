import { Component, AfterViewInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements AfterViewInit {
  url: any;
  streamid: string = "none";
  isStreaming:boolean =  false;

  isEagles!:boolean;
  isPhillies!:boolean;

  player!: videojs.Player;
  bodyTag = document.body;
  
  constructor(private _snackBar: MatSnackBar) {}

  

  ngAfterViewInit() {

  }

 /**
  * 
  * @param type 
  */
  async links(type: String){

    let resp = await fetch('https://molex.cloud/phi/links.json?' + this.rando());

    if(resp.ok){
      
      let json = await resp.json();

      console.log(json)
      json.streams.forEach((element: any) => {
        if(element.title == type){
          console.log(element.url)
          this.url = element.url
        }
      });

    }
  }


  /**
   * 
   * @param stream 
   */
  streamSelector(stream: any){

    if(stream == "phillies"){
      this.isEagles=false;
      this.isPhillies=true;
    }
    
    if(stream == "eagles"){

      this.isEagles=true;
      this.isPhillies=false;

    }

    if(stream == "extra1"){

      this.isEagles=false;
      this.isPhillies=false;

    }

    this.streamid=stream + this.rando();
    this.isStreaming=true;
    this.links(stream)

    setTimeout(async () => {

      this.player = videojs(this.streamid, {
        aspectRatio: '4:3',
        controls: true,
        autoplay: true,
        muted: true,
        html5: {
          vhs: {
            overrideNative: true
          }
        }
      });
  
      this.player.src({
        src: this.url,
        type: 'application/x-mpegURL'
      });
  
      this.player.on('play', () => {
        this.player.controls(true);
      });
    }, 300)
    setTimeout(() => {
      this.openSnackBar('Channel changed to phillies', 'Close');
    }, 300)
  }


theme(theme: any){
  if(theme){
    this.bodyTag.classList.remove(this.bodyTag.classList.toString())
    this.bodyTag.classList.add("theme-" + theme);
  }else{
    this.bodyTag.classList.remove(this.bodyTag.classList.toString())
    this.bodyTag.classList.add("main");
  }
}

  stop(){
    this.streamid="none"
    this.player.pause();
    this.isStreaming=true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  /**
   * RANDOM NUMBER GENERATOR
   * Used for concating a random 5 digit number on the end of a stream id instance.
   * 
   * @returns a random 5 digit number
   */
  rando(){
    return Math.floor(Math.random() * 100000);
  }

  
}