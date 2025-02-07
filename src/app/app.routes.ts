import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherComponent } from './other/app.othercomponent';
import { MainComponent } from './homepage/homepage';
import { AppComponent } from './app.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component:MainComponent },
    { path: 'other', component:OtherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }