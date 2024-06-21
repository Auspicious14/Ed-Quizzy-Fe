import { Component } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CourseService } from '../service/course/course.service';
import { ICourse } from '../course/model';
import { ToastSvc } from '../toast';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { LayoutComponent } from '../../components/layout/layout.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { MatTabsModule } from '@angular/material/tabs';
import { QuizService } from '../service/quiz/quiz.service';
import { IQuiz } from '../quiz/model';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    NgFor,
    LayoutComponent,
    RouterModule,
    SlickCarouselModule,
    ClipboardModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
})
export class CourseDetailComponent {
  constructor(
    private courseService: CourseService,
    private quizService: QuizService,
    private toastSvc: ToastSvc,
    private route: ActivatedRoute,
    private clipboard: Clipboard
  ) {}

  loading: boolean = false;
  course: ICourse = {} as ICourse;
  quizes: IQuiz[] = [];
  copy: string = '';
  courseId: string | null = this.route.snapshot.paramMap.get('id');
  imageLength: number = this.course.images?.length;
  textToCopy: string = `http://localhost:4200/courses/${this.route.snapshot.paramMap.get(
    'id'
  )}`;
  slideConfig: { slidesToShow: number; slidesToScroll: number } = {
    slidesToShow: this.imageLength,
    slidesToScroll: this.imageLength,
  };

  ngOnInit() {
    this.getCourse(this.courseId);
    this.getQuizByCourse(this.courseId);
  }

  getCourse(courseId: string | null) {
    this.loading = true;
    this.courseService.getCourseById(courseId).subscribe({
      next: (res) => {
        this.loading = false;
        const data = res?.data?.getCourseById;
        if (data) {
          this.course = data;
          console.log(this.course, 'courseee');
        }
      },
      error: (err) => {
        this.loading = false;
        this.toastSvc.graphQlError(err);
      },
    });
  }

  copyUrl = (): boolean => {
    if (this.textToCopy) {
      this.clipboard.copy(this.textToCopy);
      this.toastSvc.success('copied');
      return true;
    } else {
      return false;
    }
  };

  getQuizByCourse(courseId: string | null) {
    this.quizService.getQuizByCourse(courseId).subscribe({
      next: (res) => {
        this.loading = true;
        const data = res?.data?.getQuizByCourse;
        if (data) {
          this.loading = false;
          this.quizes = data;
        }
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
  }
}
