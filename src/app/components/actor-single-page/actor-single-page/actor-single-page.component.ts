import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import { ActivatedRoute } from '@angular/router';
import { Media } from 'src/app/models/media';
import { ActorService } from 'src/app/services/actor.service';
import { Actor } from 'src/app/models/actor';

@Component({
  selector: 'app-actor-single-page',
  templateUrl: './actor-single-page.component.html'
})

/**
 * A színészek adatlapját részletező komponens. Megjeleníti a színész 
 * főbb adatait és néhány szerepét. 
 */
export class ActorSinglePageComponent implements OnInit {

  actualActor: Actor;
  movies: Media[];

  constructor(private movieService: MediaService, private actorService: ActorService, private route: ActivatedRoute) {
    this.movies = [];
  }

  /**
   * A komponens indulásakor betöltöm a színész főbb adatait, valamint 
   * néhány filmet, amiben szerepel. 
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let personId = params['id'];

      this.actorService
        .getPersonDetails(personId)
        .subscribe((data: any) => {
          this.actualActor = this.actorService.convertJsonToActor(data)
        });

        this.actorService
        .getPersonMovieCredits(personId)
        .subscribe((data: any) => {

          for (let value of data.cast.slice(0, 5)) {
            this.movies.push(this.movieService.convertJsonToMovie(value));
          }
        });
    });
  }
}
