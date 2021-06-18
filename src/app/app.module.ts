import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ComponentModule } from './components/component.module';
import { ExerciseModule } from './pages/exercise/exercise.module';
import { RoutineModule } from './pages/routine/routine.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { MainComponent } from './pages/news/main/main.component';
import { ArticleComponent } from './pages/news/article/article.component';
import { MyArticlesComponent } from './pages/news/my-articles/my-articles.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    MainComponent,
    ArticleComponent,
    MyArticlesComponent
  ],
  imports: [
    SharedModule,
    ExerciseModule,
    ComponentModule,
    RoutineModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
