import { Component } from '@angular/core';
import { QuestionService } from '../service/question/question.service';
import { ToastSvc } from '../toast';
import { IQuestion } from './model';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  constructor(
    private questionService: QuestionService,
    private toastSvc: ToastSvc
  ) {}

  questions: IQuestion[] = [];
  loading: boolean = false;

  ngOnInit() {}

  getQuestionByQuiz = (quizId: string | null) => {
    return this.questionService.getQuestionByQuiz(quizId).subscribe({
      next: (res) => {
        const data = res?.data?.getQuestionByQuiz;
        this.loading = res?.loading;
        if (data) {
          this.questions = data;
        }
      },
      error: (err) => {
        this.toastSvc.graphQlError(err);
      },
    });
  };
}
