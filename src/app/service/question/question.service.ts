import { Injectable } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import {
  FIND_QUESTION_BY_QUIZ,
  GENERATE_QUESTION,
} from '../../question/gql/query';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { IQuestionInput } from '../../question/model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private apollo: Apollo) {}

  getQuestionByQuiz(quizId: string | null): Observable<ApolloQueryResult<any>> {
    return this.apollo.query({
      query: FIND_QUESTION_BY_QUIZ,
      variables: { quizId },
    });
  }

  generateQuestions(payload: IQuestionInput): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: GENERATE_QUESTION,
      variables: { payload },
    });
  }
}
