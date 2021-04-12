/**
 * Az egyes médiatartalmak főbb információit szolgáltatott eltárolni. Az eltárolt id segítségével
 * le tudjuk kérni a részletes adatlapját, hozzá kapcsolodó ajánlásoka ttudunk kérni valamint a hozzá
 * tartozó színészeket. A media_type attribútum használatával meghatározható, hogy filmről vagy
 * sorozatról van-e szó. 
 */
export class Media {
    id: number;
    title: string;
    original_language: string;
    release_date: string;
    overview: string;
    poster_path: string;
    media_type: string;

    constructor(
        id: number,
        title: string,
        original_language: string,
        overview: string,
        release_date: string,
        poster_path: string,
        media_type: string
    ) {
        this.id = id;
        this.title = title;
        this.release_date = release_date;
        this.original_language = original_language;
        this.overview = overview;
        this.poster_path = poster_path;
        this.media_type = media_type;

    }
}
