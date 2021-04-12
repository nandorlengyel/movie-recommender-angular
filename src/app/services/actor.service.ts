import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Actor } from '../models/actor';

@Injectable({
  providedIn: 'root'
})

/**
 * Szereplők api hívását és konvertálását kezelő service osztály.
 */
export class ActorService {

  private baseUrl = "https://api.themoviedb.org/3";
  private apiKey = "0247dd48c678514cdf04c32c686fc9f5";
  private language = localStorage.getItem('language');

  constructor(private http: HttpClient) { }

  private apiUrlBuilder(apiUrl: string) {
    return this.baseUrl + apiUrl + '?api_key=' + this.apiKey;
  }

  /**
   * Visszaadja egy adott id-jű személy részletes adatait. 
   * @param personId a személyhez tartozó id
   */
  getPersonDetails(personId: number){
    return this.http.get(this.apiUrlBuilder('/person/' + personId ) +'&language='+this.language);
  }

  /**
   * Visszatér olyan médiatartalmakkal, amelyebn az adott id-jú szereplő szerepel.
   * @param personId a szereplőhöz tartozó id
   */
  getPersonMovieCredits(personId: number){
    return this.http.get(this.apiUrlBuilder('/person/' + personId +'/movie_credits') +'&language='+this.language);
  }

  /**
   * Átkonvertálja a kapott JSON objektumot egy Actor objektummá.
   * @param value a kapott JSON objektum
   */
  convertJsonToActor(value: any){
    let actor = new Actor(value.id, value.name, value.birthday, value.biography, value.profile_path);
    return actor;
  }
}