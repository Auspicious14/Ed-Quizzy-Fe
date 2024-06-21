import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  COURSE_PAGE,
  GET_COURSES_BY_LEVEL,
  GET_COURSE_BY_ID,
} from '../../course/gql/query';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private apollo: Apollo) {}

  getCourses(): Observable<any> {
    return this.apollo.query({
      query: COURSE_PAGE,
    });
  }

  getCoursesByLevel(levelId: string): Observable<any> {
    return this.apollo.query({
      query: GET_COURSES_BY_LEVEL,
      variables: { levelId },
    });
  }

  getCourseById(id: string | null): Observable<any> {
    return this.apollo.query({
      query: GET_COURSE_BY_ID,
      variables: { id },
    });
  }
}
