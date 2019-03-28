import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Pokemon} from '../models/Pokemon';
import {IPokemon} from '../interfaces/IPokemon';

@Injectable()
export class PokemonService {

    public pokemonFront: IPokemon;
    public pokemonBack: IPokemon;

    constructor(private http: HttpClient) {
    }

    public show(name: string): Observable<any> {
        return this.http
            .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .pipe(map((data: any) => Pokemon.factoryFromData(data)));
    }

    public getAttackDetail(uri: string): Observable<any> {
        return this.http
            .get(`${uri}`);
    }
}
