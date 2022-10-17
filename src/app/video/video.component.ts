import { Component, AfterViewInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import videojs from 'video.js';
import { Renderer2, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit {

  // Main url variable for assigning the selected channel to the active stream
  url: any;

  // Stream urls for the specified channel
  philliesUrl: any;
  eaglesUrl: any;
  extra1Url: any;
  extra2Url: any

  // Streaming variables used for assign dom id's and displaying <video> element
  streamid: string = "none";
  isStreaming: boolean = false;

  // If/which secondary theme is active (Phillies, Eagles), also if an espn api component should be displayed.
  bodyTag = document.body;
  isEaglesTheme!: boolean;
  isPhilliesTheme!: boolean;

  // Which channel/stream is currently active
  isEaglesStream!: boolean;
  isPhilliesStream!: boolean;
  isExtra1Stream!: boolean;
  isExtra2Stream!: boolean;

  // video.js
  player!: videojs.Player;

  // Matsnackbar, and don't remember what renderer2 was for?
  constructor(
    private _snackBar: MatSnackBar,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }


  // Initiate the links function to grab which streams are available
  ngOnInit() {
    this.links();
  }

  /**
   * GET LINKS
   * Fetch links.json and iterate through the available streams 
   * and apply the properties as needed. Maniplate DOM using
   * booleans, string, and binding them to the template.
   */
  async links() {

    let resp = await fetch('links.json?' + this.rando());

    if (resp.ok) {

      let json = await resp.json();

      // console.log(json)

      json.streams.forEach((element: any) => {

        // Assign properties if stream is NOT present
        if (element.url == "") {

          // console.log("no stream " + element.title + " : " + element.url)

          if (element.title == "phillies") {

            this.philliesUrl = "";
            this.isPhilliesStream = false;
            // console.log("Phillies" + element.url + " : " + this.isPhilliesStream)

          }

          if (element.title == "eagles") {

            this.eaglesUrl = "";
            this.isEaglesStream = false;
            // console.log("Eagles" + element.url + " : " + this.isEaglesStream)

          }

          if (element.title == "extra1") {

            this.extra1Url = "";
            this.isExtra1Stream = false;
            // console.log("Extra 1" + element.url + " : " + this.isExtra1Stream)

          }

          if (element.title == "extra2") {

            this.extra2Url = "";
            this.isExtra2Stream = false;
            // console.log("Extra 2" + element.url + " : " + this.isExtra2Stream)

          }

        // Assign properties if stream is present
        } else {

          // console.log("has stream " + element.title + " : " + element.url)

          if (element.title == "phillies") {

            this.philliesUrl = element.url;
            this.isPhilliesStream = true;
            // console.log("phillies" + element.url + " : " + this.isPhilliesStream)

          }

          if (element.title == "eagles") {

            this.eaglesUrl = element.url;
            this.isEaglesStream = true;
            // console.log("Eagles" + element.url + " : " + this.isEaglesStream)

          }

          if (element.title == "extra1") {

            this.extra1Url = element.url;
            this.isExtra1Stream = true;
            // console.log("extra1" + element.url + " : " + this.isExtra1Stream)

          }

          if (element.title == "extra2") {

            this.extra2Url = element.url;
            this.isExtra2Stream = true;
            // console.log("extra2" + element.url + " : " + this.isExtra2Stream)

          }

        }



      });

    }
  }


  /**
   * STREAM SELECTOR
   * Responsible for changing the channel/stream to the appropiate selection
   * and apply the needed variables/properties for the needed videojs object.
   * 
   * @param stream - Which channel/stream
   */
  streamSelector(stream: any) {


    if (stream == "phillies") {

      this.isEaglesTheme = false;
      this.isPhilliesTheme = true;
      this.url = this.philliesUrl;

    }

    if (stream == "eagles") {

      this.isEaglesTheme = true;
      this.isPhilliesTheme = false;
      this.url = this.eaglesUrl

    }

    if (stream == "extra1") {

      this.isEaglesTheme = false;
      this.isPhilliesTheme = false;
      this.url = this.extra1Url;

    }

    if (stream == "extra2") {

      this.isEaglesTheme = false;
      this.isPhilliesTheme = false;
      this.url = this.extra2Url;

    }


    this.streamid = stream + this.rando();
    this.isStreaming = true;


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
      this.openSnackBar('Channel changed to ' + this.streamid, 'Close');
    }, 300)
  }


  /**
   * THEME SELECTOR
   * This function is used to toggle secondary themes if a supported
   * channel/stream was selected such as phillies or eagles. Combines
   * the event object and concats it "theme-<theme: any>" and then
   * applies that to the body tag class name.
   * 
   * @param theme - The name of the request theme
   */
  theme(theme: any) {
    if (theme) {
      this.bodyTag.classList.remove(this.bodyTag.classList.toString())
      this.bodyTag.classList.add("theme-" + theme);
    } else {
      this.bodyTag.classList.remove(this.bodyTag.classList.toString())
      this.bodyTag.classList.add("main");
    }
  }


  /**
   * OPEN SNACKBAR/INFO MESSAGE
   * @param message 
   * @param action 
   */
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
  rando() {
    return Math.floor(Math.random() * 100000);
  }


  /**
   * TAB SELECTION EVENT
   * If a tab index changes which is used to represent a channel/stream it will
   * then toggle to that stream and call the streamSelector as well as apply the
   * channels theme if one is available.
   * 
   * @param $event 
   */
  tab($event: { index: string | number; }) {

    if ($event.index == 1) {
      this.streamSelector('phillies');
      this.theme('phillies')
    }

    if ($event.index == 2) {
      this.streamSelector('eagles');
      this.theme('eagles')
    }


    if ($event.index == 3) {
      this.streamSelector('extra1');
      this.theme('')
    }

    if ($event.index == 4) {
      this.streamSelector('extra2');
      this.theme('')
    }


  }


}