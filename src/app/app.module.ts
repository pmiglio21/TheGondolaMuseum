import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './homepage/homepagecomponent';
import { WatchVideoComponent } from './watch-video/watchvideocomponent';
import { SearchComponent } from './search/searchcomponent';
import { routes } from './app.routes'; // Import routes
import { WebApiService } from './services/webapi.service';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/aboutcomponent';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WatchVideoComponent,
    SearchComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Use routes here
    HttpClientModule
  ],
  providers: [WebApiService], // Services like WebApiService should use @Injectable({ providedIn: 'root' })
  bootstrap: [AppComponent]
})

export class AppModule { }