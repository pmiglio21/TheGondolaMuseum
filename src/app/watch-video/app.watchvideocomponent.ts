import { Component, ViewChild, ElementRef } from "@angular/core";
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.watchvideocomponent.html',
  styleUrl: './app.watchvideocomponent.css'
})

export class WatchVideoComponent {

  constructor(private router: Router) {}

  

  goToMainRoute(){
    this.router.navigate(['/']); 
  }
}