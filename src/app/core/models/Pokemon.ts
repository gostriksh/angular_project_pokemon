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
    public moves: Array<IRedirection>;
    public attacks: Array<IAttack>;

    constructor(name, stats, imgFront, imgBack, moves, attacks) {
        this.name = name;
        this.stats = stats;
        this.imgFront = imgFront;
        this.imgBack = imgBack;
        this.moves = moves;
        this.attacks = attacks;
    }

    static factoryFromData(data: any): Pokemon {
        const speedStat = data.stats.find(s => s.stat.name === 'speed');
        const attackStat = data.stats.find(s => s.stat.name === 'attack');
        const defenseStat = data.stats.find(s => s.stat.name === 'defense');
        const healthStat = data.stats.find(s => s.stat.name === 'hp');
        const imgFront = data.sprites.front_default;
        const imgBack = data.sprites.back_default;

        const stat = new Stat(
            speedStat ? speedStat.base_stat : 0,
            attackStat ? attackStat.base_stat : 0,
            defenseStat ? defenseStat.base_stat : 0,
            healthStat ? healthStat.base_stat : 0
        );

        return new Pokemon(data.name, stat, imgFront, imgBack, data.moves, []);
    }
}
