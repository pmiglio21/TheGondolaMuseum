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
  constructor(@Inject(DOCUMENT) doc: any, private router: Router, private activatedRoute: ActivatedRoute, 
                                          private webapiservice : WebApiService) {
    this.doc = doc;

    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  searchQuery: string = ''; // Holds the search input value
  results: string[] = []; // Example data
  filteredResults: string[] = [...this.results]; // Filtered results to display

  onSearch() {
    // Filter results based on the search query
    this.filteredResults = this.results.filter((result) =>
      result.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSelect(selectedValue: string) {
    // Handle the selected value from the dropdown
    console.log('Selected value:', selectedValue);

    // Example: Navigate to a specific page or perform an action
    // if (selectedValue === 'mario') {
        this.webapiservice.GetMultipleByTag(selectedValue).subscribe((data: any) => {
        console.log(data);
      });
    // }
  }

  videoId: number = 0;

  ngOnInit() {
    this.webapiservice.GetAllDistinctTags().subscribe((data: any) => {

      this.results = JSON.parse(data);

      // console.log(data);
    });
    
    // this.webapiservice.GetMultipleByTag().subscribe((data: any) => {
    //   console.log(data);
    // });
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