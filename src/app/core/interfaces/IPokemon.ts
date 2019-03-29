import {IStat} from './IStat';
import {IRedirection} from './common/IRedirection';
import {IAttack} from './IAttack';

export interface IPokemon {
  name: string;
  stats: IStat;
  imgFront: string;
  imgBack: string;
  img: string;
  isAttacked: boolean;
  isAttacking: boolean;
  damageArray: number[];
  moves: Array<IRedirection>;
  attacks: Array<IAttack>;
}
