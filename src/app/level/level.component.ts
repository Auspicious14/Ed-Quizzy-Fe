import { Component } from '@angular/core';
import { LevelService } from '../service/level/level.service';
import { ILevel } from './model';
import { ToastSvc } from '../toast';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CourseService } from '../service/course/course.service';
import { ICourse } from '../course/model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: '.app-level',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    MatExpansionModule,
    MatProgressBarModule,
    RouterModule,
  ],
  templateUrl: './level.component.html',
  styleUrl: './level.component.css',
})
export class LevelComponent {
  constructor(
    private levelService: LevelService,
    private toastSvc: ToastSvc,
    private courseService: CourseService
  ) {}

  selectedLevel: number = 1;
  show?: { show: boolean; index?: number };
  loading: boolean = false;
  levelLoading: boolean = false;
  levels: ILevel[] = [];
  courses: ICourse[] = [];

  ngOnInit(): any {
    this.levelLoading = true;
    this.levelService.getLevels().subscribe({
      next: (res) => {
        this.levelLoading = false;
        const data = res?.data?.getLevels;
        const levels = data
          ?.slice()
          ?.sort(
            (a: any, b: any) => parseFloat(a?.level) - parseFloat(b?.level)
          );

        this.levels = levels;
      },
      error: (error) => {
        this.levelLoading = false;
        this.toastSvc.graphQlError(error);
      },
    });
  }

  handleShow(index: number) {
    if (this.show?.index === index) {
      this.show.show = !this.show.show;
    } else {
      this.show = { show: true, index };
    }
    this.selectedLevel = index;
    this.loading = true;
    const level = this.levels[index];
    this.loading = true;
    this.courseService.getCoursesByLevel(level?._id).subscribe({
      next: (res) => {
        this.loading = false;
        const data = res?.data?.getCoursesByLevel;
        this.courses = data;
      },
      error: (error) => {
        this.loading = false;
        this.toastSvc.graphQlError(error);
      },
    });
  }
}
