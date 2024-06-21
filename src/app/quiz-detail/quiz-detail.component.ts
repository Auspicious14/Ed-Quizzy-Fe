import { Component, inject } from '@angular/core';
import { QuizService } from '../service/quiz/quiz.service';
import { IQuiz } from '../quiz/model';
import { ActivatedRoute } from '@angular/router';
import { ToastSvc } from '../toast';
import { LayoutComponent } from '../../components/layout/layout.component';
import { QuestionService } from '../service/question/question.service';
import { IQuestion } from '../question/model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [LayoutComponent, NgFor, NgIf],
  templateUrl: './quiz-detail.component.html',
})
export class QuizDetailComponent {
  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private toastSvc: ToastSvc
  ) {}

  loading: boolean = false;
  questionLoading: boolean = false;
  questionIndex: number = 0;
  choosenAnswer: number = 0;
  score: number = 0;
  quizId: string | null = this.route.snapshot.paramMap.get('id');
  quiz: IQuiz = {} as IQuiz;
  questions: IQuestion[] = [];
  rightAnswers: Array<string> = [];
  attemptedAnswers: Array<{
    index: number;
    option: string;
    questionIndex: number;
  }> = [];

  ngOnInit() {
    this.getQuizById(this.quizId);
    this.getQuestionByQuiz(this.quizId);
  }

  getQuizById(id: string | null) {
    this.quizService.getQuizById(id).subscribe({
      next: (res) => {
        const data = res?.data?.getQuizById;
        if (data) {
          this.quiz = data;
        }
      },
      error: (err) => {
        this.toastSvc.graphQlError(err);
      },
    });
  }

  getQuestionByQuiz = (quizId: string | null) => {
    return this.questionService.getQuestionByQuiz(quizId).subscribe({
      next: (res) => {
        const data = res?.data?.getQuestionByQuiz;
        this.loading = res?.loading;
        if (data) {
          this.questions = data;
        }
        return data;
      },
      error: (err) => {
        this.toastSvc.graphQlError(err);
      },
    });
  };

  updateQuiz = async (score: number) => {
    return this.quizService
      .updateQuiz(this.quizId, {
        score,
        status: 'COMPLETED',
      })
      .subscribe({
        next: (res) => {
          const data = res?.data?.updateQuiz;
          console.log(data);
          if (data) {
            this.getQuizById(this.quizId);
          }
          return data;
        },
        error: (err) => {
          this.toastSvc.graphQlError(err);
        },
      });
  };

  generateQuestions = async (quizId: string) => {
    this.questionLoading = true;
    return this.questionService.generateQuestions({ quizId }).subscribe({
      next: (res) => {
        this.questionLoading = false;
        const data = res?.data?.generateQuestions;
        if (data) {
          this.questions = data;
        }
        return data;
      },
      error: (err) => {
        this.questionLoading = false;
        this.toastSvc.graphQlError(err);
      },
    });
  };

  handleNext = (position: 'Back' | 'Next') => {
    if (position == 'Next') {
      this.questionIndex = this.questionIndex + (1 % this.questions.length);

      if (this.questionIndex == this.questions.length) {
        const allAttemptedOptions = this.attemptedAnswers.map((q) => q.option);
        const allCorrectAnswers = this.questions.map((q) => q.answer);
        this.rightAnswers = allAttemptedOptions.filter((i) =>
          allCorrectAnswers.includes(i)
        );
        this.score = this.rightAnswers.length;
        this.updateQuiz(this.score);
      }
    } else {
      this.questionIndex = this.questionIndex - (1 % this.questions.length);
    }
  };

  handleSaveAnswer = (questionIndex: number, i: number, option: string) => {
    this.choosenAnswer = i;
    questionIndex = questionIndex + 1;

    const existingOption = this.attemptedAnswers.findIndex(
      (item) => item.questionIndex === questionIndex
    );

    if (existingOption !== -1) {
      this.attemptedAnswers[existingOption] = {
        index: i,
        option,
        questionIndex: questionIndex,
      };
    } else {
      this.attemptedAnswers.push({
        index: i,
        option,
        questionIndex: questionIndex,
      });
    }
  };
}
