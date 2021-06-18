import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExercisesService } from 'src/app/services/exercises.service';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'bh-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  @ViewChildren('pagination') childPagination: QueryList<PaginationComponent>;
  exercises!: any;
  totalExercises: number = 30;
  totalPages: number = 4;
  pageSize: number = 4;
  currentPageExercise: number = 1;

  loaded: boolean;
  error: boolean;
  nameSearched = new FormControl('');

  constructor(private exercisesService: ExercisesService) {}

  ngOnInit(): void {
    this.fetchExercise();
  }
  private fetchExercise = () => {
    this.exercises = [];
    this.loaded = false;
    this.error = false;
    this.exercisesService
      .getExercisesByPages(
        this.currentPageExercise - 1,
        this.pageSize,
        'nombre',
        true
      )
      .subscribe(
        (data) => {
          this.totalExercises = data.totalElements;
          this.totalPages = Math.round(data.totalElements / this.pageSize);
          this.childPagination.forEach((PaginationComponent) => {
            PaginationComponent.setPages(this.totalPages);
          });
          this.loaded = true;
          this.exercises = data.content;
        },
        (err) => {
          this.loaded = true;
          this.error = true;
          console.log('Error: ', err.message);
        }
      );
  };
  receivePage = ($event) => {
    if ($event !== 0) {
      this.exercises = [];
      this.loaded = false;
      this.currentPageExercise = $event;
      this.fetchExercise();
    }
  };
  onSearch = () => {
    // Limitar resultados
    if (!/^\s*$/.test(this.nameSearched.value)) {
      this.exercises = [];
      this.loaded = false;
      this.error = false;
      this.exercisesService
        .getExercisesFound(this.nameSearched.value)
        .subscribe(
          (data) => {
            this.loaded = true;
            // console.log(data);
            this.exercises = data;
          },
          (err) => {
            this.loaded = true;
            this.error = true;
            console.log('Error: ', err.message);
          }
        );
    } else {
      this.fetchExercise();
    }
  };
}
