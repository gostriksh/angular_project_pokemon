import {IStat} from '../interfaces/IStat';
import {IPokemon} from '../interfaces/IPokemon';

export class Pokemon implements IPokemon {
  public name: string;
  public stats: IStat;

  constructor(name, stats) {
    this.name = name;
    this.stats = stats;
  }
}
