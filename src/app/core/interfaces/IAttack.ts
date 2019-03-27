import {IRedirection} from './common/IRedirection';

export interface IAttack {
  pp: number;
  power: number;
  name: string;
  type: IRedirection;
  accuracy: number;
}
