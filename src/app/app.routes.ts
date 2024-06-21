import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CourseComponent } from './course/course.component';
import { GuardService } from './service/guard/guard.service';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth/signin',
    component: SigninComponent,
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
  },
  {
    path: 'courses',
    component: CourseComponent,
  },
  {
    path: 'courses',
    canActivateChild: [GuardService],
    children: [
      {
        path: ':id',
        component: CourseDetailComponent,
      },
    ],
  },
  {
    path: 'quizes',
    component: QuizComponent,
    canActivate: [GuardService],
  },
  {
    path: 'quiz',
    canActivateChild: [GuardService],
    children: [
      {
        path: ':id',
        component: QuizDetailComponent,
      },
    ],
  },
];
