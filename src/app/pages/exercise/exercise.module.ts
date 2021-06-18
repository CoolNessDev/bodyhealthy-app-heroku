import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { ExerciseUpdateComponent } from './exercise-update/exercise-update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { ComponentModule } from 'src/app/components/component.module';
import { ExerciseMuscleComponent } from './exercise-muscle/exercise-muscle.component';



@NgModule({
  declarations: [
    ExercisesComponent,
    ExerciseFormComponent,
    ExerciseUpdateComponent,
    ExerciseMuscleComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  exports:[
    ExercisesComponent,
    ExerciseFormComponent,
    ExerciseUpdateComponent,
    ExerciseMuscleComponent
  ]
})
export class ExerciseModule { }
