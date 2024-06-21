import { Component } from '@angular/core';
import { QuizService } from '../service/quiz/quiz.service';
import { IQuiz } from './model';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ToastSvc } from '../toast';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [LayoutComponent, NgFor, NgIf, MatCardModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  constructor(
    private quizService: QuizService,
    private router: Router,
    private toastSvc: ToastSvc
  ) {}

  loading: boolean = false;
  quizes: IQuiz[] = [];

  ngOnInit() {
    this.getQuizes();
  }

  getQuizes() {
    this.quizService.getQuizes().subscribe({
      next: (res) => {
        this.loading = true;
        const data = res?.data?.getQuizes;
        if (data) {
          this.loading = false;
          this.quizes = data;
        }
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
        this.toastSvc.graphQlError(err);
      },
    });
  }
}
