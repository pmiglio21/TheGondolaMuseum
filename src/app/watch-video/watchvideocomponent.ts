import { Component, ViewChild, ElementRef, Inject } from "@angular/core";
import { ActivatedRoute, RouterOutlet, Router, Params } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'watch-video',
  imports: [RouterOutlet],
  templateUrl: './watchvideocomponent.html',
  styleUrl: './watchvideocomponent.css'
})

export class WatchVideoComponent {
  private doc: Document;
  constructor(@Inject(DOCUMENT) doc: any, private router: Router, private activatedRoute: ActivatedRoute) {
    this.doc = doc;

    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  videoId: number = 0;

  ngOnInit() {
    // window.location.reload();

      this.activatedRoute.params.subscribe((params: Params) => this.videoId = params['id']);

      this.setupVideo();

      // Automatically play the video when the route is loaded
      const myVideo: HTMLVideoElement | null = this.doc.getElementById("my_video_1") as HTMLVideoElement;
      if (myVideo) {
        myVideo.play();
      }
  }

  setupVideo() {
    var randomVideoSource = this.doc.getElementById("random-video-source");  
    
    if (randomVideoSource != null)
    {
      randomVideoSource.setAttribute("src", "assets/videos/"+this.videoId+".webm")
    }

    return
  }
  
  getRandomInt() {
    var minimum = 1
    var maximum = 5

    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  goToRandomVideo(){
    // this.videoId = this.getRandomInt()

    // this.setupVideo();

    var randomIndex = this.getRandomInt()

    this.router.navigate(['/watch-video', randomIndex]);  
  }
}