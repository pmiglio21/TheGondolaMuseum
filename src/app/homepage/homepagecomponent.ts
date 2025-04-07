import { Component, ViewChild, ElementRef, Inject } from "@angular/core";
import { RouterOutlet, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './homepagecomponent.html',
  styleUrl: './homepagecomponent.css'
})

export class HomePageComponent {
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
    // this.doc.addEventListener('click', function(evt) {
    //   console.log(evt.target);}, false);

    this.setupDailyRandomVideo();
  }

  setupDailyRandomVideo() {
    var randomVideoSource = this.doc.getElementById("random-video-source");  

    var randomIndex = this.getRandomInt()
    
    if (randomVideoSource != null)
    {
      randomVideoSource.setAttribute("src", "assets/videos/"+randomIndex+".webm")
    }

    return
  }

  getRandomInt() {
    var minimum = 1
    var maximum = 1000

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

  goToRandomVideo(){
      var randomIndex = this.getRandomInt()

      this.router.navigate(['/watch-video', randomIndex]);  
  }

  goToSearch(){
    this.router.navigate(['/search']);  
  }
}