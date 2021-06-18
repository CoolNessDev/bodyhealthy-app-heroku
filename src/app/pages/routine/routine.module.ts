import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/components/component.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoutinesComponent } from './routines/routines.component';
import { LevelsComponent } from './levels/levels.component';
import { ExercisesRoutineComponent } from './exercises-routine/exercises-routine.component';
import { MyroutinesComponent } from './myroutines/myroutines.component';
import { RoutineFormComponent } from './routine-form/routine-form.component';



@NgModule({
  declarations: [
    RoutinesComponent,
    LevelsComponent,
    ExercisesRoutineComponent,
    MyroutinesComponent,
    RoutineFormComponent,

  ],
  imports: [
    CommonModule,
    ComponentModule,
    SharedModule,
  ],
  exports:[
    RoutinesComponent,
    LevelsComponent,
    ExercisesRoutineComponent,
    MyroutinesComponent,
    RoutineFormComponent,
  ]
})
export class RoutineModule { }
