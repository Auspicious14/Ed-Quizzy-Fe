import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_LEVELS_PAGE } from '../../level/gql/query';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  constructor(private apollo: Apollo) {}

  getLevels(): Observable<any> {
    return this.apollo.query({
      query: GET_LEVELS_PAGE,
    });
  }
}
