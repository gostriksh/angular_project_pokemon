import {ILog} from '../interfaces/ILog';
import {IPokemon} from '../interfaces/IPokemon';

export class Log implements ILog {
    pokemon: IPokemon;
    value: string;

    constructor(value, pokemon) {
        this.value = value;
        this.pokemon = pokemon;
    }
}
