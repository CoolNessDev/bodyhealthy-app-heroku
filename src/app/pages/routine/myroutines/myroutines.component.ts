import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Routine } from 'src/app/models/routine';
import { RoutineService } from 'src/app/services/routine.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'bh-myroutines',
  templateUrl: './myroutines.component.html',
  styleUrls: ['./myroutines.component.css'],
})
export class MyroutinesComponent implements OnInit {
  spinnerMessage: string = 'Eliminando rutina';
  errorMessage: string = 'Error al cargar rutinas';
  routines?: Routine[];
  loaded: boolean = false;
  error: boolean = false;
  constructor(
    private routinesService: RoutineService,
    private userServices: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const userId: number = parseInt(this.userServices.getUserId());
    this.fetchRoutines(userId);
  }
  fetchRoutines(userId: number) {
    this.loaded = false;
    this.error = false;
    this.routinesService.getRoutinesByUser(userId).subscribe(
      (data) => {
        this.routines = data;
        this.loaded = true;
      },
      (err) => {
        this.error = true;
        this.loaded = true;
        this.errorMessage = err.error.message;
      }
    );
  }
  onDelete = (id: number) => {
    this.spinner.show();
    const userId: number = parseInt(this.userServices.getUserId());
    this.routinesService.deleteRoutine(id, userId).subscribe(
      (data) => {
        // console.log(data);
        this.spinner.hide();
        window.location.reload();
      },
      (err) => {
        console.log('Error: ', err);
        this.spinner.hide();
        window.location.reload();
      }
    );
  };
}
