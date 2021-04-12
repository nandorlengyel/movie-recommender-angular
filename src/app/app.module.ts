import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MediaService } from './services/media.service';
import { FormsModule } from '@angular/forms';
import { MediaSinglePageComponent } from './components/media-single-page/media-single-page.component';
import { MediaSearchPageComponent } from './components/media-search-page/media-search-page.component';
import { ActorSinglePageComponent } from './components/actor-single-page/actor-single-page/actor-single-page.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    MediaSearchPageComponent,
    MediaSinglePageComponent,
    MediaSinglePageComponent,
    ActorSinglePageComponent,
    
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: MediaSearchPageComponent
      },
      {
        path: 'media',
        component: MediaSearchPageComponent
      },
      {
        path: 'media/:media_type/:id',
        component: MediaSinglePageComponent
      },
      {
        path: 'actor/:id',
        component: ActorSinglePageComponent
      }
    ])
  ],
  
  providers: [MediaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
