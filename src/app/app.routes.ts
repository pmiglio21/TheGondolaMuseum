import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchVideoComponent } from './watch-video/watchvideocomponent';
import { HomePageComponent } from './homepage/homepagecomponent';
import { SearchComponent } from './search/searchcomponent';
import { AppComponent } from './app.component';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [
    { path: '', component:HomePageComponent },
    { path: 'watch-video/:id', component: WatchVideoComponent, data: { renderMode: 'default' } },
    { path: 'search', component:SearchComponent , data: {renderMode: 'default'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }