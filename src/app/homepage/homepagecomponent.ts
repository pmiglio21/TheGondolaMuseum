import { Component, ViewChild, ElementRef, Inject } from "@angular/core";
import { RouterOutlet, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { WebApiService } from './../services/webapi.service'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './homepagecomponent.html',
  styleUrl: './homepagecomponent.css'
})

export class HomePageComponent {
  private doc: Document;
  private dailyVideoId: number = 0;

  constructor(@Inject(DOCUMENT) doc: any, private router: Router, private webapiservice : WebApiService) {
    this.doc = doc;
    this.dailyVideoId = this.getDailyRandomInt(1, 1000);
  }

  getDailyRandomInt(min: number, max: number): number {
    const today = new Date().toISOString().split('T')[0];
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % (max - min + 1)) + min;
  }
  
  videoId: number = 0;
  videoName: string = "";

  title = "The Gondola Archive"

  dailyRandomVideoSource = "assets/videos/2.webm"

  name = "Angular";
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef<any> = {} as ElementRef;
  isPlay: boolean = false;
  
  ngOnInit() {
    this.setupDailyRandomVideo();

    this.webapiservice.GetSingleByVideoId(this.dailyVideoId).subscribe((data: any) => {

      const videoData = JSON.parse(data);

      // Map the JSON response to Angular variables
      this.videoId = videoData.VideoId;
      this.videoName = videoData.VideoName;
    });
  }

  setupDailyRandomVideo() {
    const randomVideoSource = this.doc.getElementById("random-video-source");
   
    if (randomVideoSource != null) {
      // Dynamically set the video source
      randomVideoSource.setAttribute("src", "assets/videos/" + this.dailyVideoId + ".webm");
    }
  }

  goToWatchVideo() {
    this.router.navigate(['/watch-video', this.videoId]);
  }
}