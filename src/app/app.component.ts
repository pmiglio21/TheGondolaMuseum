import { Component, ViewChild, ElementRef } from "@angular/core";
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private router: Router) {}

  getRandomInt() {
    var minimum = 1
    var maximum = 1854 // 1854 is the last video id in the database

    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  goToRandomVideo(){
      var randomIndex = this.getRandomInt()

      this.router.navigate(['/watch-video', randomIndex]);  
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
}
