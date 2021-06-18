import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bh-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input()
  message: string="Cargando";
  constructor() { }

  ngOnInit(): void {
  }

}
