import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Exercise } from 'src/app/models/exercise';
import { Routine } from 'src/app/models/routine';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { RoutineService } from 'src/app/services/routine.service';
import { removeExercise } from '../../../shared/utilities';

@Component({
  selector: 'bh-routine-form',
  templateUrl: './routine-form.component.html',
  styleUrls: ['./routine-form.component.css'],
})
export class RoutineFormComponent implements OnInit {
  spinnerMessage: string="Actualizando"
  // form
  newRutineForm: FormGroup;
  routine: Routine = new Routine();
  exercises: Exercise[] = [];
  exercisesDrop: Exercise[] = [];

  // pageable parameters
  totalExercises: number = 30;
  totalPages: number = 3;
  pageSize: number = 6;
  currentPageExercise: number = 1;
  // alerts
  loaded: boolean;
  error: boolean;
  // seacher
  nameSearched = new FormControl('');
  // validations
  roles: string[];
  isAdmin = false;
  itemsDrop: any = {};
  inEdit: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private exercisesService: ExercisesService,
    private tokenService: TokenService,
    private routineService: RoutineService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.getRoutine(id);
      this.inEdit = true;
    }
    this.initForm();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ADMIN') {
        this.isAdmin = true;
      }
    });
    this.fetchExercise();
  }
  private getRoutine = (id: number) => {
    this.routineService.getRoutine(id).subscribe(
      (data) => {
        this.routine = data;
        this.loadData(data);
        this.getRoutineExercises(id);
      },
      (err) => {
        console.log('Error: ', err);
        window.location.href = '';
      }
    );
  };
  private setItems = (exercises: Exercise[],boolValue:boolean) => {
    for (let index = 0; index < exercises.length; index++) {
      let id = exercises[index].idEjercicio;
      if (this.itemsDrop[id] == undefined) {
        this.itemsDrop[id] = boolValue;
      }if(this.inEdit){
        this.itemsDrop[id] = boolValue;
      }
    }
  };
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
          this.loaded = true;
          this.exercises = data.content;
          this.setItems(this.exercises,true);
        },
        (err) => {
          this.loaded = true;
          this.error = true;
          console.log('Error: ', err.message);
        }
      );
  };
  private getRoutineExercises = (id: number) => {
    this.exercisesService.getExercisesByRoutine(id).subscribe((data) => {
      this.exercisesDrop = data;
      this.setItems(this.exercisesDrop,false);
    });
  };

  onMuscle = (muscleId: number) => {
    this.exercises = [];
    this.loaded = false;
    this.error = false;
    this.exercisesService.getExercisesByMuscle(muscleId).subscribe(
      (data) => {
        if (data.length <= 0) {
          this.error = true;
        }
        this.loaded = true;
        this.exercises = data;
        this.setItems(this.exercises,true);
      },
      (err) => {
        this.loaded = true;
        this.error = true;
        console.log('Error: ', err.message);
      }
    );
  };
  onSearch = () => {
    this.exercises = [];
    if (!/^\s*$/.test(this.nameSearched.value)) {
      this.loaded = false;
      this.error = false;
      this.exercisesService
        .getExercisesFound(this.nameSearched.value)
        .subscribe(
          (data) => {
            this.loaded = true;
            this.exercises = data;
            this.setItems(this.exercises,true);
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
  initForm = (): void => {
    this.newRutineForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      nivel: new FormControl(null, Validators.required),
    });
  };
  loadData = (data): void => {
    this.newRutineForm.get('name').setValue(data.nombre);
    this.newRutineForm.get('nivel').setValue(data.nivel);
  };
  setValues() {
    this.routine.nombre = this.name.value;
    this.routine.nivel = this.nivel.value;
    this.routine.ejercicios = this.exercisesDrop;
    this.routine.userName = this.tokenService.getUsername();
  }
  private get name() {
    return this.newRutineForm.get('name');
  }
  private get nivel() {
    return this.newRutineForm.get('nivel');
  }

  // ### DRAG AND DROP FUNCTIONS ######################################
  onDragStart = (event, exercise: Exercise) => {
    var j = JSON.stringify(exercise);
    // add exercise in JSON
    event.dataTransfer.setData('exercise', j);
  };
  onDragOver = (event) => {
    event.preventDefault();
  };
  // On routine
  onDrop = (event, exercise: Exercise) => {
    if (event.dataTransfer) {
      // get exercise in JSON
      const ex = event.dataTransfer.getData('exercise');
      this.exercisesDrop = removeExercise(this.exercisesDrop, JSON.parse(ex));
      // set itemdrop false to arrow icon
      this.itemsDrop[JSON.parse(ex).idEjercicio] = false;
      // save exercise
      this.exercisesDrop.push(JSON.parse(ex));
      event.dataTransfer.clearData();
    } else {
      // drop by arrow button
      // set itemdrop false to arrow icon
      this.itemsDrop[exercise.idEjercicio] = false;
      this.exercisesDrop.push(exercise);
    }
  };
  // On cards zone
  onCardDrop = (event, exercise: Exercise) => {
    if (event.dataTransfer) {
      // get exercise in JSON
      const ex = event.dataTransfer.getData('exercise');
      // set itemdrop false to arrow icon
      this.itemsDrop[JSON.parse(ex).idEjercicio] = true;
      // remove exercise from routine
      this.exercisesDrop = removeExercise(this.exercisesDrop, JSON.parse(ex));
      event.dataTransfer.clearData();
    } else {
      // drop by arrow button
      // remove exercise from routine
      this.itemsDrop[exercise.idEjercicio] = true;
      this.exercisesDrop = removeExercise(this.exercisesDrop, exercise);
    }
  };
  open = (content) => {
    this.modalService.open(content);
  };
  save = () => {
    this.spinner.show();
    this.setValues();
    if (this.inEdit) {
      this.spinnerMessage="Actualizando rutina";
      const id = this.activatedRoute.snapshot.params.id;
      this.routineService.putRoutine(id,this.routine).subscribe(data=>{
        this.spinner.hide();
        window.location.href="/rutinas/misrutinas"
      },err=>{
        console.log("Error: ",err);
        this.spinner.hide();
      })
    } else {
      this.spinnerMessage="Creando rutina";
      if (this.isAdmin) {
        this.routineService.postRoutineDefault(this.routine).subscribe(
          (data) => {
            this.spinner.hide();
            window.location.href="/rutinas/misrutinas"
          },
          (err) => {
            console.log('error: ', err);
            this.spinner.hide();
          }
        );
      } else {
        this.routineService.postRoutine(this.routine).subscribe(
          (data) => {
            this.spinner.hide();
            window.location.href="/rutinas/misrutinas"
          },
          (err) => {
            console.log('error: ', err);
            this.spinner.hide();
          }
        );
      }
    }
  };
}
