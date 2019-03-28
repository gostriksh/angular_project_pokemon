import {IStat} from '../interfaces/IStat';
import {IPokemon} from '../interfaces/IPokemon';
import {Stat} from './Stat';
import {IRedirection} from '../interfaces/common/IRedirection';

export class Pokemon implements IPokemon {
    public name: string;
    public stats: IStat;
    public imgFront: string;
    public imgBack: string;
    public img: string;
    public isAttacked: boolean;
    public isAttacking: boolean;
    public moves: Array<IRedirection>;

    constructor(name, stats, imgFront, imgBack, img, moves) {
        this.name = name;
        this.stats = stats;
        this.imgFront = imgFront;
        this.imgBack = imgBack;
        this.moves = moves;
        this.img = img;
        this.isAttacked = false;
        this.isAttacking = false;
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

        return new Pokemon(data.name, stat, imgFront, imgBack, img, data.moves);
    }
}
