import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from './material-module'
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { EaglesapiComponent } from './eaglesapi/eaglesapi.component';
import { PhilliesapiComponent } from './philliesapi/philliesapi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //
  { path: 'video', component: VideoComponent },
  { path: '', redirectTo: '/video', pathMatch: 'full' },
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideoComponent,
    EaglesapiComponent,
    PhilliesapiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
