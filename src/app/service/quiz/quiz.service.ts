import { Injectable } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  FIND_QUIZ_BY_COURSE,
  FIND_QUIZ_BY_ID,
  QUIZ_PAGE,
  UPDATE_QUIZ,
} from '../../quiz/gql/query';
import { ApolloQueryResult } from '@apollo/client/core';
import { IQuiz, IQuizPayload } from '../../quiz/model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private apollo: Apollo) {}

  getQuizes(): Observable<ApolloQueryResult<any>> {
    return this.apollo.query({
      query: QUIZ_PAGE,
      variables: {},
    });
  }

  getQuizByCourse(courseId: string | null): Observable<ApolloQueryResult<any>> {
    return this.apollo.query({
      query: FIND_QUIZ_BY_COURSE,
      variables: { courseId },
    });
  }

  getQuizById(id: string | null): Observable<ApolloQueryResult<any>> {
    return this.apollo.query({
      query: FIND_QUIZ_BY_ID,
      variables: { id },
    });
  }

  generateQuiz(payload: IQuizPayload): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: UPDATE_QUIZ,
      variables: {
        courseTitle: payload.courseTitle,
        courseId: payload.courseId,
      },
    });
  }

  updateQuiz(
    id: string | null,
    payload: IQuizPayload
  ): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: UPDATE_QUIZ,
      variables: { id, payload },
    });
  }
}
