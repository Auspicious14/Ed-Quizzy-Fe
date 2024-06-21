import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course/course.service';
import { ToastSvc } from '../toast';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ICourse } from './model';
import { NgFor, NgIf } from '@angular/common';
import { LevelComponent } from '../level/level.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    NavbarComponent,
    NgFor,
    LevelComponent,
    NgIf,
    MatProgressSpinnerModule,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private toastSvc: ToastSvc
  ) {}

  loading: boolean = false;
  courses: ICourse[] = [];

  ngOnInit(): any {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (res) => {
        this.loading = false;
        const data = res?.data?.getCourses;
        console.log(data, 'data');

        this.courses = data;
      },
      error: (error) => {
        this.loading = false;
        this.toastSvc.graphQlError(error);
      },
    });
  }

  handleShow(course: ICourse) {
    console.log('clicked', course);
    this.courseService.getCoursesByLevel(course?._id).subscribe({
      next: (res) => {
        const data = res?.data?.getCoursesByLevel;
        console.log(data.every((d: any) => d?.level));

        this.courses = data;
      },
      error: (error) => {
        this.toastSvc.graphQlError(error);
      },
    });
  }
}
