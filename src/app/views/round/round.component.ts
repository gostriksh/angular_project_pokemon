import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../../core/services/pokemon.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.sass']
})
export class RoundComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.show('pikachu')
      .subscribe();
  }

}
