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
  videos: { VideoId: number; VideoName: string }[] = []; // Array to hold video data

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

        this.videos = JSON.parse(data);
      });
    }
  }

  videoId: number = 0;

  onVideoSelect(videoId: number) {
    // Handle the video selection (e.g., navigate to a video page)
    console.log('Selected VideoId:', videoId);
    this.router.navigate(['/watch-video', videoId]);
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
    var randomIndex = this.getRandomInt()

    this.router.navigate(['/watch-video', randomIndex]);  
  }

  goToSearch(){
    this.router.navigate(['/search']);  
  }
}