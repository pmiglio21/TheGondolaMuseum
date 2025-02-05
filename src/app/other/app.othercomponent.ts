import { Component, ViewChild, ElementRef } from "@angular/core";
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.othercomponent.html',
  styleUrl: './app.othercomponent.css'
})

export class OtherComponent {

  constructor(private router: Router) {}

  goToMainRoute(){
    this.router.navigate(['/main']); 
  }
}