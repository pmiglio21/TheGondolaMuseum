import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchVideoComponent } from './watch-video/app.watchvideocomponent';
import { MainComponent } from './homepage/homepage';
import { AppComponent } from './app.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component:MainComponent },
    { path: 'watch-video', component:WatchVideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }