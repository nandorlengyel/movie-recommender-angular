import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import { Media } from 'src/app/models/media';
import { ActivatedRoute } from "@angular/router";
import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-page',
  templateUrl: './media-search-page.component.html'
})
/**
 * A médiatartalmak kereséséért felelős komponens, az alkalmazás betöltődésekor 
 * ez a komponens jelenik meg. 
 */
export class MediaSearchPageComponent implements OnInit {

  movies: Media[];
  actualMovie: Media;
  queryString: string;
  genres: Map<number,string>;

  constructor(private mediaService: MediaService, private route: ActivatedRoute) {
    this.movies = [];
  }

  /**
   * A komponens indulásakor a legnépszerűbb filmeket töltöm az aktuális filmek helyére, 
   * valamint lekérem az elérhető műfajokat. 
   */
  ngOnInit(): void {
      this.getTopPopularMovies();
      this.mediaService
      .getMovieGenres()
      .subscribe((data: any) => {
        this.genres = data.genres;
      });
  }

  /**
   * Feladarabolja a kapott tömböt megadott méretű tömbökre, a médiatartalmak 
   * listázásakor használom.
   * @param array a kapott darabolandó tömb
   * @param size megadja, hogy egy altömb hány darabot tartalmazzon
   */
  chunk(array: Media[], size: number) {
    let results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  }

  /**
   * Az aktuális filmek (this.movies) betölti a legnépszerűbb filemket.
   */
  getTopPopularMovies(){
    this.movies = [];
    this.mediaService
      .getPopularMovies()
      .subscribe((data: any) => {

        for(let value of data.results){
          this.movies.push(this.mediaService.convertJsonToMovie(value));
       }
       this.movies = this.chunk(this.movies, 4);
      });
  }

  /**
   * Szabadszavú keresését valósít meg, a kapott filmeket betölti 
   * az aktuális filmek helyére. 
   */
  searchByQueryString(){
    this.movies = [];
    this.mediaService
      .searchMovies(this.queryString)
      .subscribe((data: any) => {

        for(let value of data.results){
          this.movies.push(this.mediaService.convertJsonToMovie(value));
       }

       this.movies = this.chunk(this.movies, 4);
      });
  }

  /**
   * Műfaj szerinti keresését valósít meg, a kapott filmeket betölti 
   * az aktuális filmek helyére. 
   * @param genreId a műfaj id-ja
   */
  searchByGenre(genreId: number){
    this.movies = [];
    this.mediaService
      .getMoviesByGenre(genreId)
      .subscribe((data: any) => {

        for(let value of data.results){
          this.movies.push(this.mediaService.convertJsonToMovie(value));
       }

       this.movies = this.chunk(this.movies, 4);
      });
  }
}
