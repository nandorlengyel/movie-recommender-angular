import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  
})

export class AppComponent {
  title = 'Movie recommender app';
  language: string;

  /**
   * Az oldal fő komponensének betőltődésekor az angol az alapértalmezett nyelv,
   * ezt be is állítja a local storage-ba.
   */
  ngOnInit(): void {
    this.language = localStorage.getItem('language');
    if (this.language == "") this.language = "en-US";
  }

  /**
   * A tartalom nyelvének beállítása, local storage-ba mentés.
   * @param language a tartalom új nyelve
   */
  changeLanguage(language: string){
    localStorage.setItem('language', language);
    window.location.reload();
  }
}





