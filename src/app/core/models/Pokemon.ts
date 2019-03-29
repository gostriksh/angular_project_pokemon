import {IStat} from '../interfaces/IStat';
import {IPokemon} from '../interfaces/IPokemon';
import {Stat} from './Stat';
import {IRedirection} from '../interfaces/common/IRedirection';
import {IAttack} from '../interfaces/IAttack';

export class Pokemon implements IPokemon {
    public name: string;
    public stats: IStat;
    public imgFront: string;
    public imgBack: string;
    public img: string;
    public isAttacked: boolean;
    public isAttacking: boolean;
    public damageArray: number[];
    public moves: Array<IRedirection>;
    public allAttacks: Array<IAttack>;
    public attacks: Array<IAttack>;
    public color: string;

    constructor(name, stats, imgFront, imgBack, img, moves, allAttacks, attacks) {
        this.name = name;
        this.stats = stats;
        this.imgFront = imgFront;
        this.imgBack = imgBack;
        this.moves = moves;
        this.attacks = attacks;
        this.allAttacks = attacks;
        this.img = img;
        this.isAttacked = false;
        this.isAttacking = false;
        this.damageArray = [];
    }

    static factoryFromData(data: any): Pokemon {
        const speedStat = data.stats.find(s => s.stat.name === 'speed');
        const attackStat = data.stats.find(s => s.stat.name === 'attack');
        const defenseStat = data.stats.find(s => s.stat.name === 'defense');
        const healthStat = data.stats.find(s => s.stat.name === 'hp');
        const img = data.sprites.front_default;
        const imgFront = `https://play.pokemonshowdown.com/sprites/xyani/${data.name}.gif`;
        const imgBack = `https://play.pokemonshowdown.com/sprites/xyani-back/${data.name}.gif`;

        const stat = new Stat(
            speedStat ? speedStat.base_stat : 0,
            attackStat ? attackStat.base_stat : 0,
            defenseStat ? defenseStat.base_stat : 0,
            healthStat ? healthStat.base_stat : 0
        );

        return new Pokemon(data.name, stat, imgFront, imgBack, img, data.moves, [], []);
    }

    public setColor(color: string): void {
        this.color = color;
    }
}
