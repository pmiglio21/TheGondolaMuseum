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
    private webApiService : WebApiService) {
      
    this.doc = doc;

    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit() {
    try {
      // Wait for GetAllDistinctTags to complete
      var data: any = await this.webApiService.GetAllDistinctTags().toPromise();
      this.allDistinctTags = JSON.parse(data);
  
      // Proceed with other logic after tags are loaded
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['tag']) {
          this.searchQuery = params['tag'];
        }
        else if (params['source'])
        {
          this.searchQuery = params['source'];
        }
        
        if (params['searchMode'])
        {
            this.searchMode = params['searchMode'];
        }
      });

      if (this.searchQuery)
      {
        this.onSearchButtonClicked(this.searchQuery); // Trigger search after tags are loaded
      }
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  }

  searchMode: string = 'tag'; // Default search mode is "tag"
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

  onSearchButtonClicked(selectedValue: string) {
    if (selectedValue === "") {
      this.videos = []; // Clear the videos array if no search query is provided
    }
    else {
      if (this.searchMode === 'tag') {
        this.onSearchBarValueSelected(selectedValue); // Call a method to load search results for the tag
      }
      else if (this.searchMode === 'source') {
        this.webApiService.GetMultipleBySource(selectedValue).subscribe((data: any) => {
  
          if (selectedValue) {
            this.renavigateToSearch("", selectedValue, this.searchMode); // Call a method to load search results for the tag
          }
  
          if (data === null || data === "") {
            this.videos = []; // Clear the videos array if no data is returned
          }
          else {
            // Parse the data and include VideoUrl for each video
            this.videos = JSON.parse(data).map((video: any) => ({
              VideoId: video.VideoId,
              VideoName: video.VideoName,
              // VideoUrl: `assets/videos/${video.VideoId}.webm` // Example video path
            }));

            // Generate thumbnails for the videos
            this.generateThumbnails();
          }
        });
      }
    }
  }

  onSearchBarValueSelected(selectedValue: string) {
    // Example: Navigate to a specific page or perform an action
    if (this.allDistinctTags.some(tag => tag.trim().toLowerCase() === selectedValue.trim().toLowerCase())) {
        this.webApiService.GetMultipleByTag(selectedValue).subscribe((data: any) => {

        if (selectedValue) {
          this.renavigateToSearch(selectedValue, "", this.searchMode); // Call a method to load search results for the tag
        }

        if (data === null || data === "") {
          this.videos = []; // Clear the videos array if no data is returned
        }
        else {
          // Parse the data and include VideoUrl for each video
          this.videos = JSON.parse(data).map((video: any) => ({
            VideoId: video.VideoId,
            VideoName: video.VideoName,
            // VideoUrl: `assets/videos/${video.VideoId}.webm` // Example video path
          }));

          // Generate thumbnails for the videos
          this.generateThumbnails();
        }
      });
    }
    else {
      this.videos = []; // Clear the videos array if no data is returned

      if (selectedValue) {
        this.renavigateToSearch(selectedValue, "", this.searchMode); // Call a method to load search results for the tag
      }
    }
  }

  renavigateToSearch(tag: string, source: string, searchMode: string) {
    // Navigate to the SearchComponent with the selected tag as a query parameter
    if (this.searchMode === 'tag') {
      this.router.navigate(['/search'], { queryParams: { tag, searchMode } });
    }
    else if (this.searchMode === 'source') {
      this.router.navigate(['/search'], { queryParams: { source, searchMode } });
    }
  }

  videoId: number = 0;

  onVideoSelect(videoId: number) {
    const videoIds = this.videos.map(video => video.VideoId);
    
    this.router.navigate(['/watch-video'], {
      replaceUrl: false,
      queryParams: { videoId: videoId, videoIds: JSON.stringify(videoIds) }
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
        };
      };
    });
  }
}