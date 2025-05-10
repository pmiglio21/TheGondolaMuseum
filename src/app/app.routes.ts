import { Routes } from '@angular/router';
import { WatchVideoComponent } from './watch-video/watchvideocomponent';
import { HomePageComponent } from './homepage/homepagecomponent';
import { SearchComponent } from './search/searchcomponent';
import { AboutComponent } from './about/aboutcomponent';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'watch-video', component: WatchVideoComponent, data: { renderMode: 'default' } },
    { path: 'search', component: SearchComponent, data: { renderMode: 'default' } },
    { path: 'about', component: AboutComponent, data: { renderMode: 'default' } },
];