import { Component, ViewChild, ElementRef, Inject } from "@angular/core";
import { ActivatedRoute, RouterOutlet, Router, Params } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { WebApiService } from './../services/webapi.service'; 

@Component({
  selector: 'watch-video',
  imports: [RouterOutlet],
  templateUrl: './watchvideocomponent.html',
  styleUrl: './watchvideocomponent.css'
})

export class WatchVideoComponent {
  private doc: Document;
  constructor(@Inject(DOCUMENT) doc: any, private router: Router, private activatedRoute: ActivatedRoute,
                                          private webapiservice : WebApiService) {
    this.doc = doc;

    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  videoId: number = 0;
  videoName: string = "";
  isFavorite: boolean = false;
  originalFileName?: string;
  tags?: string[];
  musicOrigin?: string;
  musicName?: string;
  backgroundArtOrigin?: string;
  gondolaCreator?: string;
  earliestFoundDateOfPosting: number = 0;
  similarVideos?: number[];
  rippedFrom?: string;

  ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => this.videoId = params['id']);

      this.setupVideo();

      this.webapiservice.GetSingleByVideoId(this.videoId).subscribe((data: any) => {

        const videoData = JSON.parse(data);

        // Map the JSON response to Angular variables
        this.videoId = videoData.VideoId;
        this.videoName = videoData.VideoName;
        this.isFavorite = videoData.IsFavorite;
        this.originalFileName = videoData.OriginalFileName;
        this.tags = videoData.Tags;
        this.musicOrigin = videoData.MusicOrigin;
        this.musicName = videoData.MusicName;
        this.backgroundArtOrigin = videoData.BackgroundArtOrigin;
        this.gondolaCreator = videoData.GondolaCreator;
        this.earliestFoundDateOfPosting = videoData.EarliestFoundDateOfPosting;
        this.similarVideos = videoData.SimilarVideos;
        this.rippedFrom = videoData.RippedFrom;

        // console.log(this.originalFileName)
      });

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
    var maximum = 1000

    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  goToRandomVideo(){
    // this.videoId = this.getRandomInt()

    // this.setupVideo();

    var randomIndex = this.getRandomInt()

    this.router.navigate(['/watch-video', randomIndex]);  
  }

  goToSearch(){
    this.router.navigate(['/search']);  
  }
}