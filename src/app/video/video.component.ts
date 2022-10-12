import { Component, AfterViewInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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
  
  ngAfterViewInit() {

  }

  /**
 * 
 */
  async links(type: String){

    let resp = await fetch('links.json?' + this.rando());

    if(resp.ok){
      let streams = await resp.json();

      if(type == "phillies"){
        console.log(streams.streams.phillies)
        return streams.streams.phillies
      }

      if(type == "eagles"){
        console.log(streams.streams.eagles)
        return streams.streams.eagles
      }
    }
  }
  /**
   * GET PHILLIES STREAM PAGE
   */
  phillies(){
    this.streamid="phillies" + this.rando();
    this.isStreaming=true;
    this.isEagles=false;
    this.isPhillies=true;

    setTimeout(async () => {
      console.log(this.links("phillies"))
      this.url = await this.links("phillies");

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

}

 /**
   * GET EAGLES STREAM PAGE
   */
eagles(){
  
  this.streamid="eagles" + this.rando();;
  this.isStreaming=true;
  this.isEagles=true;
  this.isPhillies=false;

  setTimeout(async () => {
    console.log(this.links("eagles"))
    this.url = await this.links("eagles");

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
  
}

/**
 * 
 */
redzone(){

}


/**
 * 
 */
extra(){

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
