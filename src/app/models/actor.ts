/**
 * Színészek főbb adatait tárolja. Az id segítségével le tudjuk kérdezni, hogy melyik
 * filmekben/sorozatokban játszik még az adott szereplő.
 */
export class Actor {

    id: number;
    name: string;
    birthday: Date;
    biography: string;
    profile_path: string;

    constructor(id:number, name: string, birthday:Date, biography: string, profile_path: string){
        this.id = id;
        this.name= name;
        this.birthday = birthday;
        this.biography = biography;
        this.profile_path= profile_path;
    }
}
