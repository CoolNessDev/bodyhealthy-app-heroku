import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Muscle } from 'src/app/models/muscle';
import { MuscleService } from 'src/app/services/muscle.service';

@Component({
  selector: 'bh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

}
