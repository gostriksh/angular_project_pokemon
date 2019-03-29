import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AttackService {

  constructor(private http: HttpClient) {
  }

  public getAttackDetail(uri: string): Observable<any> {
    return this.http
        .get(`${uri}`);
  }
}
