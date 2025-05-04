import { Component, ViewChild, ElementRef, Inject } from "@angular/core";
import { ActivatedRoute, RouterOutlet, Router, Params } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { DOCUMENT } from '@angular/common';
import { WebApiService } from './../services/webapi.service'; 

@Component({
  selector: 'watch-video',
  imports: [RouterOutlet, CommonModule],
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

 // Video Ids gotten from coming from search page
  videoIdsInCollection: number[] = [];

  ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => this.videoId = params['id']);

      this.activatedRoute.queryParams.subscribe(queryParams => {
        if (queryParams['videoIds']) {
          this.videoIdsInCollection = JSON.parse(queryParams['videoIds']);
          console.log('Video IDs:', this.videoIdsInCollection);
        }
      });

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
  }

  ngAfterViewInit() {
    const myVideo: HTMLVideoElement | null = this.doc.getElementById("video-element") as HTMLVideoElement;
    if (myVideo) {
      myVideo.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    } else {
      console.error('Video element not found.');
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

  searchByTag(tag: string) {
    // Navigate to the SearchComponent with the selected tag as a query parameter
    this.router.navigate(['/search'], { queryParams: { tag } });
  }
  
  goToSimilarVideo(similarVideoId: number) {
    this.router.navigate(['/watch-video', similarVideoId]);
    
    this.similarVideos?.push(this.videoId);

    this.router.navigate(['/watch-video', similarVideoId], {
      queryParams: { videoIds: JSON.stringify(this.similarVideos) }
    });
  }

  goToPreviousVideo() {
    if (!this.videoIdsInCollection || this.videoIdsInCollection.length === 0) {
      // If videoIdsInCollection is empty, decrement videoId or loop back to 1854
      const previousVideoId = this.videoId === 1 ? 1854 : this.videoId - 1;
      this.router.navigate(['/watch-video', previousVideoId]);
    } else {
      const currentIndex = this.videoIdsInCollection.indexOf(this.videoId);
  
      // Check if the current video is the first one
      if (currentIndex > 0) {
        // Navigate to the previous video in the collection
        const previousVideoId = this.videoIdsInCollection[currentIndex - 1];
        this.router.navigate(['/watch-video', previousVideoId], {
          queryParams: { videoIds: JSON.stringify(this.videoIdsInCollection) }
        });
      } else {
        // If at the beginning, loop back to the last video in the collection
        const lastVideoId = this.videoIdsInCollection[this.videoIdsInCollection.length - 1];
        this.router.navigate(['/watch-video', lastVideoId], {
          queryParams: { videoIds: JSON.stringify(this.videoIdsInCollection) }
        });
      }
    }
  }
  
  goToNextVideo() {
    if (!this.videoIdsInCollection || this.videoIdsInCollection.length === 0) {
      // If videoIdsInCollection is empty, increment videoId or loop back to 1
      const nextVideoId = this.videoId === 1854 ? 1 : this.videoId + 1;
      this.router.navigate(['/watch-video', nextVideoId]);
    } else {
      const currentIndex = this.videoIdsInCollection.indexOf(this.videoId);
  
      // Check if the current video is the last one
      if (currentIndex < this.videoIdsInCollection.length - 1) {
        // Navigate to the next video in the collection
        const nextVideoId = this.videoIdsInCollection[currentIndex + 1];
        this.router.navigate(['/watch-video', nextVideoId], {
          queryParams: { videoIds: JSON.stringify(this.videoIdsInCollection) }
        });
      } else {
        // If at the end, loop back to the first video in the collection
        const firstVideoId = this.videoIdsInCollection[0];
        this.router.navigate(['/watch-video', firstVideoId], {
          queryParams: { videoIds: JSON.stringify(this.videoIdsInCollection) }
        });
      }
    }
  }
}