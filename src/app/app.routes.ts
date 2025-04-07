import { Routes } from '@angular/router';
import { WatchVideoComponent } from './watch-video/watchvideocomponent';
import { HomePageComponent } from './homepage/homepagecomponent';
import { SearchComponent } from './search/searchcomponent';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'watch-video/:id', component: WatchVideoComponent, data: { renderMode: 'default' } },
    { path: 'search', component: SearchComponent, data: { renderMode: 'default' } },
];