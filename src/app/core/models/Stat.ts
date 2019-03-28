import {IStat} from '../interfaces/IStat';

export class Stat implements IStat {
  public speed: number;
  public attack: number;
  public defense: number;
  public currentHealth: number;
  public totalHealth: number;

  constructor(speed, attack, defense, health) {
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
    this.currentHealth = health;
    this.totalHealth = health;
  }


}
