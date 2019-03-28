import {IAttack} from '../interfaces/IAttack';
import {IRedirection} from '../interfaces/common/IRedirection';

export class Attack implements IAttack {
    pp: number;
    power: number;
    name: string;
    type: IRedirection;
    accuracy: number;

  constructor(pp, power, name, type, accuracy) {
    this.pp = pp;
    this.power = power;
    this.name = name;
    this.type = type;
    this.accuracy = accuracy;
  }
}
