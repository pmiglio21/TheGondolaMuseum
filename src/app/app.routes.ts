import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchVideoComponent } from './watch-video/watchvideocomponent';
import { HomePageComponent } from './homepage/homepagecomponent';
import { AppComponent } from './app.component';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [
    { path: '', component:HomePageComponent },
    { path: 'watch-video/:id', component:WatchVideoComponent , data: {renderMode: 'default'}},
    // { path: 'watch-video', component:WatchVideoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }