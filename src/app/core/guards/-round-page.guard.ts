import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {PokemonService} from '../services/pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class RoundPageGuard implements CanActivate  {
  constructor(private pokemonService: PokemonService,
              private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (this.pokemonService.pokemonBack !== undefined && this.pokemonService.pokemonFront !== undefined) {
      return true;
    }
    return this.router.parseUrl( '/');
  }
}
