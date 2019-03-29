import {Component, OnInit} from '@angular/core';
import {concat, filter, first, switchMap, tap} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {PokemonService} from '../../core/services/pokemon.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {IRedirection} from '../../core/interfaces/common/IRedirection';

@Component({
    selector: 'app-attack-selection',
    templateUrl: './attackSelection.component.html',
    styleUrls: ['./attackSelection.component.sass']
})
export class AttackSelectionComponent implements OnInit {

    constructor(private pokemonService: PokemonService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    public pokemonFront: IPokemon;
    public pokemonBack: IPokemon;
    public pokemonFrontAttacks: Array<IRedirection> = [];
    public pokemonBackAttacks: Array<IRedirection> = [];
    public frontValidated: boolean;
    public backValidated: boolean;


    public onSelect(attack: IRedirection, pokemon: IPokemon) {
        const attacks = pokemon === this.pokemonFront ? this.pokemonFrontAttacks : this.pokemonBackAttacks;

        const isAttackAlreadySelected = attacks.find(value => value.name === attack.name);
        const numberOfAttackSelected = attacks.length;

        if (isAttackAlreadySelected === undefined && numberOfAttackSelected < 4) {
            attacks.push(attack);
        }
    }

    public onValidate(pokemon: IPokemon) {
        this.fetchAttacks(pokemon)
            .pipe(
                tap(attacks => {
                    pokemon.attacks = attacks;
                    if (pokemon === this.pokemonFront) {
                        this.frontValidated = true;
                    } else {
                        this.backValidated = true;
                    }

                }))
            .subscribe();
    }

    public launchFight() {
        if (this.backValidated && this.frontValidated) {
            this.pokemonService.pokemonFront = this.pokemonFront;
            this.pokemonService.pokemonBack = this.pokemonBack;
            this.router.navigate(['round'])
                .catch(e => console.log);
        }
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(this.fetchPokemons.bind(this)),
            filter(() => !!(this.pokemonFront && this.pokemonBack)),
        ).subscribe();
    }

    private fetchPokemons(params): Observable<any> {
        const pokemonFrontName = params.get('pokemonFront');
        const pokemonBackName = params.get('pokemonBack');

        const front$ = this.pokemonService.show(pokemonFrontName)
            .pipe(
                first(p => this.pokemonFront = p)
            );

        const back$ = this.pokemonService.show(pokemonBackName)
            .pipe(
                first(p => this.pokemonBack = p)
            );
        return front$.pipe(concat(back$));

    }

    private fetchAttacks(pokemon: IPokemon): Observable<any> {
        const attacks = pokemon === this.pokemonFront ? this.pokemonFrontAttacks : this.pokemonBackAttacks;

        const attackRequests = [];

        for (const attack of attacks) {
            attackRequests.push(this.pokemonService.getAttackDetail(attack.url));
        }

        return forkJoin(attackRequests);

    }

}
