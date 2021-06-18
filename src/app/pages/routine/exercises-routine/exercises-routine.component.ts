import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Routine } from 'src/app/models/routine';
import { ExercisesService } from 'src/app/services/exercises.service';
import { RoutineService } from 'src/app/services/routine.service';

@Component({
  selector: 'bh-exercises-routine',
  templateUrl: './exercises-routine.component.html',
  styleUrls: ['./exercises-routine.component.css'],
})
export class ExercisesRoutineComponent implements OnInit {
  routine: Routine;
  spinnerMessage: string = 'Buscando rutina';
  routineState: number=0;
  loaded: boolean = false;
  error: boolean = false;
  constructor(
    private routineService: RoutineService,
    private exerciseService: ExercisesService,
    private activatedRouter: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    let id: number = this.activatedRouter.snapshot.params.id;
    this.fetchRoutine(id);

  }
  fetchRoutine(id: number) {
    this.spinner.show();
    this.routineService.getRoutine(id).subscribe(
      (data) => {
        this.routine = data;
        this.routine.estado = 80;
        this.fetchExercises(id);
        this.spinner.hide();
      },
      (err) => {
        console.log('Error: ', err);
        this.spinner.hide();
        window.location.href = '';
      }
    );
  }
  fetchExercises(id: number) {
    this.loaded = false;
    this.error = false;
    this.exerciseService.getExercisesByRoutine(id).subscribe(
      (data) => {
        // console.log(data);
        if(data.length<=0){
          this.error = true;
        }
        this.routine.ejercicios = data;
        this.loaded = true;
      },
      (err) => {
        // console.log('Error: ', err);
        this.error = true;
      }
    );
  }
  receiveCheck = ($event) => {
    if($event){
      this.routineState+=100/this.routine.ejercicios.length;
    }else{
      this.routineState-=100/this.routine.ejercicios.length;
    }
  };
}
