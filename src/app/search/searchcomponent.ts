import { Component, ViewChild, ElementRef, Inject } from "@angular/core";
import { ActivatedRoute, RouterOutlet, Router, Params } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { WebApiService } from './../services/webapi.service'; 

@Component({
  selector: 'search',
  imports: [RouterOutlet],
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

  videoId: number = 0;

  

  ngOnInit() {
    this.webapiservice.GetMultipleByTag().subscribe((data: any) => {
      console.log(data);
    });
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