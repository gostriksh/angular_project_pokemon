import {IStat} from './IStat';
import {IRedirection} from './common/IRedirection';
import {IAttack} from './IAttack';

export interface IPokemon {
  name: string;
  stats: IStat;
  imgFront: string;
  imgBack: string;
  isAttacked: boolean;
  isAttacking: boolean;
  damageArray: number[];
  moves: Array<IRedirection>;
  allAttacks: Array<IAttack>;
  attacks: Array<IAttack>;
  color: string;
  img: string;

  setColor(color: string);
}
