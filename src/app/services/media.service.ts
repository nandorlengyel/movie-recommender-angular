import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Media } from '../models/media';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
/**
 * Médiatartalmak api hívását és konvertálását kezelő service osztály.
 */
export class MediaService {

  private baseUrl = "https://api.themoviedb.org/3";
  private apiKey = "0247dd48c678514cdf04c32c686fc9f5";
  private language = localStorage.getItem('language');

  constructor(private http: HttpClient) { }

/**
 * Az api url-ek felépítésében segít, visszaadja a már kész, http kliensnek átadható url-t
 * @param apiUrl az api kérés tényleges tartalma 
 */
  private apiUrlBuilder(apiUrl: string) {
    return this.baseUrl + apiUrl + '?api_key=' + this.apiKey;
  }

  /**
   * Visszaadja egy adott id-jú és típusú médiatartalom JSON objektumát
   * @param id médiatartalom id-ja
   * @param media_type médiatartalom típusa 
   */
  getMediaById(id: number, media_type: string) {
    return this.http.get(this.apiUrlBuilder('/'+media_type+'/' + id) + '&language='+this.language);
  }

  /**
   * Szabadszavas keresését valósít meg, eredményül több médatartalom JSON 
   * objektumával tér vissza. 
   * @param queryValue a keresésnél használt kulcsszó  
   */
  searchMovies(queryValue: string) {
    return this.http.get(this.apiUrlBuilder('/search/multi') + '&query=' + queryValue);
  }

  /**
   * Visszadja a legnépszerűbb filmeket, eredményül több médatartalom JSON objektumával 
   * tér vissza. 
   */
  getPopularMovies(){
    return this.http.get(this.apiUrlBuilder('/discover/movie') + '&language='+this.language+'&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
  }

  /**
   * Egy adott médatartalomhoz kapcsolodóan ajánl más tartalmakat, eredményül több 
   * médatartalom JSON objektumával tér vissza.
   * @param id médiatartalom id-ja
   * @param media_type médiatartalom típusa 
   */
  getMovieRecommendations(movieId: number, media_type: string){
    return this.http.get(this.apiUrlBuilder('/'+media_type+'/' + movieId + '/recommendations') + '&language='+this.language+'&page=1');
  }

  /**
   * Visszatér a filmekhez tartozó lehetséges műfajokkal. 
   */
  getMovieGenres(){
    return this.http.get(this.apiUrlBuilder('/genre/movie/list') + '&language='+this.language);
  }

  /**
   * Egya adott műfaj legnépszerűbb filmejeivel tér vissza, eredményül több 
   * médatartalom JSON objektumát adja.
   * @param genreId a műfaj id-ja
   */
  getMoviesByGenre(genreId: number){
    return this.http.get(this.apiUrlBuilder('/discover/movie') + '&language='+this.language+'&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + genreId);
  }

  /**
   * Visszatér egy adott filmehez tartozó stáblistával. 
    @param id médiatartalom id-ja
   * @param media_type médiatartalom típusa 
   */
  getMovieCredits(movieId: number, media_type:string) {
    return this.http.get(this.apiUrlBuilder('/'+media_type+'/' + movieId + '/credits'));
  }

  /**
   * Átkonvertálja a kapott JSON objektumot egy Media objektummá, különválasztja a 
   * filmeket és sorozatokat.
   * @param value a kapott JSON objektum
   */
  convertJsonToMovie(value: any){

    let movie;
    
    if(value.first_air_date) {
      movie = new Media(value.id, value.name, value.original_language, value.overview, value.first_air_date, value.poster_path, "tv");

    }else{
      movie = new Media(value.id, value.title, value.original_language, value.overview, value.release_date, value.poster_path, "movie");
    }
    console.log(movie);
    return movie;
  }
}


