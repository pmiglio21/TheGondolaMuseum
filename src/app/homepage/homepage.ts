import { Component, ViewChild, ElementRef, Inject } from "@angular/core";
import { RouterOutlet, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})

export class MainComponent {
  private doc: Document;
  constructor(@Inject(DOCUMENT) doc: any, private router: Router) {
    this.doc = doc;
  }

  title = "The Gondola Museum"

  dailyRandomVideoSource = "assets/videos/2.webm"

  name = "Angular";
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef<any> = {} as ElementRef;
  isPlay: boolean = false;
  
  ngOnInit() {
    this.setupDailyRandomVideo();
  }

  setupDailyRandomVideo() {

    console.log("made it into setupDailyRandomVideo")

    var randomVideoSource = this.doc.getElementById("random-video-source");  

    var randomIndex = this.getRandomInt()
    
    if (randomVideoSource != null)
    {
      console.log("made it into null check")

      randomVideoSource.setAttribute("src", "assets/videos/"+randomIndex+".webm")
    }

    return
  }

  getRandomInt() {
    var minimum = 1
    var maximum = 5

    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

  playPause() {
    var myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }

  makeBig() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 560;
  }

  makeSmall() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 320;
  }

  makeNormal() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 420;
  }

  skip(skipLength: number) {
    let video: any = document.getElementById("my_video_1");
    video.currentTime += skipLength;
  }

  restart() {
    let video: any = document.getElementById("my_video_1");
    video.currentTime = 0;
  }

  goToOtherRoute(){
      this.router.navigate(['/other']);  
  }
}