import { Component, ViewChild, ElementRef, Inject } from "@angular/core";
import { ActivatedRoute, RouterOutlet, Router, Params } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { DOCUMENT } from '@angular/common';
import { WebApiService } from './../services/webapi.service'; 

@Component({
  selector: 'search',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './searchcomponent.html',
  styleUrl: './searchcomponent.css'
})

export class SearchComponent {
  private doc: Document;

  constructor(
    @Inject(DOCUMENT) doc: any, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private webapiservice : WebApiService) {
      
    this.doc = doc;

    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  searchQuery: string = ''; // Holds the search input value
  allDistinctTags: string[] = []; // Example data
  filteredTags: string[] = [...this.allDistinctTags]; // Filtered results to display
  videos: { VideoId: number; VideoName: string; VideoUrl: string; ThumbnailUrl?: string }[] = [];
  // videos: { VideoId: number; VideoName: string }[] = []; // Array to hold video data

  onSearch() {
    // Filter results based on the search query
    this.filteredTags = this.allDistinctTags.filter((tag) =>
      tag.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSelect(selectedValue: string) {
    // Handle the selected value from the dropdown
    console.log('Selected value:', selectedValue);

    // Example: Navigate to a specific page or perform an action
    if (this.filteredTags.some(tag => tag.toLowerCase() === selectedValue.toLowerCase())) {
        this.webapiservice.GetMultipleByTag(selectedValue).subscribe((data: any) => {
        console.log(data);

        // Parse the data and include VideoUrl for each video
        this.videos = JSON.parse(data).map((video: any) => ({
          VideoId: video.VideoId,
          VideoName: video.VideoName,
          // VideoUrl: `assets/videos/${video.VideoId}.webm` // Example video path
        }));
  
        // Generate thumbnails for the videos
        this.generateThumbnails();
      });
    }
  }

  videoId: number = 0;

  onVideoSelect(videoId: number) {
    // Handle the video selection (e.g., navigate to a video page)
    console.log('Selected VideoId:', videoId);
    this.router.navigate(['/watch-video', videoId]);
  }

  generateThumbnails() {
    // const videoElement = document.getElementById('thumbnail-video') as HTMLVideoElement;
    const canvasElement = document.getElementById('thumbnail-canvas') as HTMLCanvasElement;
    const context = canvasElement.getContext('2d');
  
    this.videos.forEach((video, index) => {
      const videoElement = document.createElement('video');
      videoElement.src = "assets/videos/"+video.VideoId+".webm";
  
      videoElement.onloadeddata = () => {
        // Set the canvas size to match the video dimensions
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
  
        // Seek to a specific time in the video (e.g., 2 seconds)
        videoElement.currentTime = 2;
  
        videoElement.onseeked = () => {
          // Draw the current frame of the video onto the canvas
          context?.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  
          // Convert the canvas content to a data URL (base64 image)
          video.ThumbnailUrl = canvasElement.toDataURL('image/jpeg');
  
          // Trigger change detection if needed
          console.log(`Generated thumbnail for video ${video.VideoId}`);
        };
      };
    });
  }

  ngOnInit() {
    this.webapiservice.GetAllDistinctTags().subscribe((data: any) => {

      this.allDistinctTags = JSON.parse(data);
    });

    // Get the tag from the query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['tag']) {
        this.searchQuery = params['tag'];
        this.onSearch();
      }
    });

    this.onSelect(this.searchQuery);
  }
}