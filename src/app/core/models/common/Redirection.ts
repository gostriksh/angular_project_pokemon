import {IRedirection} from '../../interfaces/common/IRedirection';

export class Redirection implements IRedirection {
    name: string;
    url: string;

    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}
