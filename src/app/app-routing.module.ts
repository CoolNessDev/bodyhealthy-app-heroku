import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { ExerciseFormComponent } from './pages/exercise/exercise-form/exercise-form.component';
import { ExerciseMuscleComponent } from './pages/exercise/exercise-muscle/exercise-muscle.component';
import { ExerciseUpdateComponent } from './pages/exercise/exercise-update/exercise-update.component';
import { ExercisesComponent } from './pages/exercise/exercises/exercises.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticleComponent } from './pages/news/article/article.component';
import { MainComponent } from './pages/news/main/main.component';
import { MyArticlesComponent } from './pages/news/my-articles/my-articles.component';
import { RegisterComponent } from './pages/register/register.component';
import { ExercisesRoutineComponent } from './pages/routine/exercises-routine/exercises-routine.component';
import { LevelsComponent } from './pages/routine/levels/levels.component';
import { MyroutinesComponent } from './pages/routine/myroutines/myroutines.component';
import { RoutineFormComponent } from './pages/routine/routine-form/routine-form.component';
import { RoutinesComponent } from './pages/routine/routines/routines.component';
import { GuardService as guard } from './services/guard/guard.service';
const routes: Routes = [
  // redirect if no exist :id
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'noticias', component:  MainComponent},
  { path: 'noticias/mispublicaciones', component:  MyArticlesComponent},
  { path: 'noticias/:id', component: ArticleComponent },
  { path: 'micuenta', component: AccountComponent },
  { path: 'rutinas', component: RoutinesComponent },
  { path: 'rutinas/crear', component: RoutineFormComponent, canActivate: [guard], data: { expectedRol: ['admin','user'] }  },
  { path: 'rutinas/misrutinas', component: MyroutinesComponent, canActivate: [guard], data: { expectedRol: ['admin','user'] } },
  { path: 'rutinas/editar/:id', component: RoutineFormComponent, canActivate: [guard], data: { expectedRol: ['admin','user'] } },
  { path: 'rutinas/:level', component: LevelsComponent },
  { path: 'rutinas/ejercicios/:id', component: ExercisesRoutineComponent },
  { path: 'ejercicios', component: ExercisesComponent },
  { path: 'ejercicios/musculos', component: ExerciseMuscleComponent },
  { path: 'ejercicios/musculos/:id', component: ExerciseMuscleComponent },
  { path: 'ejercicios/insertar', component: ExerciseFormComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'ejercicios/editar/:id', component: ExerciseUpdateComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
