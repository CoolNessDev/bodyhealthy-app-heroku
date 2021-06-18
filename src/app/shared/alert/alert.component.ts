import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bh-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input()
  alertClass: string;
  @Input()
  message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
