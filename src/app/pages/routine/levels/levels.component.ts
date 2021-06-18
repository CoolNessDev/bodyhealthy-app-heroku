import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Routine } from 'src/app/models/routine';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { RoutineService } from 'src/app/services/routine.service';

@Component({
  selector: 'bh-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css'],
})
export class LevelsComponent implements OnInit {
  spinnerMessage: string = 'Eliminando rutina';
  routines: Routine[];
  // validator
  isAdmin = false;
  roles: string[];
  constructor(
    private routineService: RoutineService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ADMIN') {
        this.isAdmin = true;
      }
    });
    let level: string = this.activatedRoute.snapshot.params.level;
    this.fetchRoutines(level);
  }
  fetchRoutines(level: string) {
    this.routineService.getDefaultRoutinesByLevel(level).subscribe(
      (data) => {
        this.routines = data;
      },
      (err) => {
        console.log('Error: ', err);
        window.location.href = '';
      }
    );
  }
  onDelete = (id: number) => {
    this.spinner.show();
    this.routineService.deleteDefaultRoutine(id).subscribe(
      (data) => {
        // console.log(data);
        this.spinner.hide();
      },
      (err) => {
        console.log('Error: ', err);
        this.spinner.hide();
        window.location.reload();
      }
    );
  };
}
