import { Component, AfterViewInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements AfterViewInit {
  url: string = "";
  streamid: string = "none";
  isStreaming:boolean =  false;

  isEagles!:boolean;
  isPhillies!:boolean;

  player!: videojs.Player;

  ngAfterViewInit() {

  }


  /**
   * GET PHILLIES STREAM PAGE
   */
  phillies(){
    this.streamid="phillies";
    this.isStreaming=true;
    this.isEagles=false;
    this.isPhillies=true;

    setTimeout(() => {
      this.url = 'https://hoagie.memesyndicate.to/b10.m3u8'

      this.player = videojs('phillies', {
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

  this.streamid="eagles";
  this.isStreaming=true;
  this.isEagles=true;
  this.isPhillies=false;

  setTimeout(() => {
    this.url = 'https://view.memesyndicate.to/espn_no_g.m3u8'

  this.player = videojs('eagles', {
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

  stop(){
    this.streamid="none"
    this.player.pause();
    this.isStreaming=true;
  }


  
}