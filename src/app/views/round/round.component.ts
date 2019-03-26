import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../core/services/pokemon.service';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.sass']
})
export class RoundComponent implements OnInit {
    private pokemon: IPokemon;

    constructor(private pokemonService: PokemonService) {
    }

    ngOnInit() {
        this.pokemonService.show('pikachu')
            .pipe(
                first(p => this.pokemon = p)
            )
            .subscribe();
    }

}
