import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import { ActivatedRoute } from '@angular/router';
import { Media } from 'src/app/models/media';
import { ActorService } from 'src/app/services/actor.service';
import { Actor } from 'src/app/models/actor';

@Component({
  selector: 'app-movie-single-page',
  templateUrl: './media-single-page.component.html'
})

/**
 * Egyetlen médiatartalom megjelenítéséért felelős komponens, amelyen
 * megtekinthető a részletes adatlap, a benne szereplő főbb színészek és kapcsolódó 
 * film/sorozat ajánlások.
 */
export class MediaSinglePageComponent implements OnInit {

  actualMovie: Media;
  similarMovies: Media[];
  actors: Actor[];

  constructor(private movieService: MediaService, private actorService: ActorService, private route: ActivatedRoute) {
    this.actualMovie = undefined;
    this.actors = [];
    this.similarMovies = [];
  }

  /**
   * A komponens induláskor lekérem az adott médiatartalomhoz tartozó adatokat, 
   * benne szereplő színészeket, és ajánlásokat is (ilyen sorrendben). 
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actualMovie = undefined;
      this.actors = [];
      this.similarMovies = [];

      let movieId = params['id'];
      let media_type = params['media_type'];

      this.movieService
        .getMediaById(movieId, media_type )
        .subscribe((data: any) => {

          this.actualMovie = this.movieService.convertJsonToMovie(data);
          console.log(this.actualMovie);
        });

      this.movieService
        .getMovieCredits(movieId, media_type)
        .subscribe((data: any) => {

          for (let value of data.cast.slice(0, 5)) {
            this.actors.push(this.actorService.convertJsonToActor(value));
          }
          console.log(this.actors);
        });

        this.movieService
        .getMovieRecommendations(movieId, media_type)
        .subscribe((data: any) => {

          for (let value of data.results.slice(0, 5)) {
          
            this.similarMovies.push(this.movieService.convertJsonToMovie(value));

          }
          console.log(this.similarMovies);
        });

    });
  }
}

