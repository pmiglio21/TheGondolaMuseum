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

  async ngOnInit() {
    try {
      // Wait for GetAllDistinctTags to complete
      var data: any = await this.webapiservice.GetAllDistinctTags().toPromise();
      this.allDistinctTags = JSON.parse(data);
  
      // Proceed with other logic after tags are loaded
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['tag']) {
          this.searchQuery = params['tag'];
          this.onTextEnteredIntoSearch(); // Trigger search after tags are loaded
        }
      });

      this.onSearchBarValueSelected(this.searchQuery); // Trigger search after tags are loaded
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  }

  searchQuery: string = ''; // Holds the search input value
  allDistinctTags: string[] = []; // Example data
  filteredTags: string[] = []; // Filtered results to display
  videos: { VideoId: number; VideoName: string; VideoUrl: string; ThumbnailUrl?: string }[] = [];

  onTextEnteredIntoSearch() {
    // Filter results based on the search query
    this.filteredTags = this.allDistinctTags.filter((tag) =>
      tag.trim().toLowerCase().includes(this.searchQuery.trim().toLowerCase())
    );
  }

  onSearchBarValueSelected(selectedValue: string) {
    // Example: Navigate to a specific page or perform an action
    if (this.allDistinctTags.some(tag => tag.trim().toLowerCase() === selectedValue.trim().toLowerCase())) {
        this.webapiservice.GetMultipleByTag(selectedValue).subscribe((data: any) => {
        console.log(data);

        if (selectedValue) {
          this.renavigateToSearch(selectedValue); // Call a method to load search results for the tag
        }

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

  renavigateToSearch(tag: string) {
    // Navigate to the SearchComponent with the selected tag as a query parameter
    this.router.navigate(['/search'], { queryParams: { tag } });
  }

  videoId: number = 0;

  onVideoSelect(videoId: number) {
    const videoIds = this.videos.map(video => video.VideoId);
    
    this.router.navigate(['/watch-video', videoId], {
      queryParams: { videoIds: JSON.stringify(videoIds) }
    });
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
          // console.log(`Generated thumbnail for video ${video.VideoId}`);
        };
      };
    });
  }
}