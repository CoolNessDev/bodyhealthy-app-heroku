import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bh-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onLevel=(level:string)=>{
    this.router.navigate(['/rutinas', level]);
  }
}
