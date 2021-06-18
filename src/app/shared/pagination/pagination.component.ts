import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'bh-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input()
  currentPage!: number;
  @Input()
  numberPages!: number;
  pages:number[]=[];

  @Output()
  pageEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    this.setPages(this.numberPages);
  }
  public setPages=(totalPages: number)=>{
    this.pages=[];
    for (let index = 1; index <= totalPages; index++) {
      this.pages.push(index);
    }
  }
  sendPage(index:number, next:boolean=false) {
    if(next){
      if(this.currentPage>1&&this.currentPage<this.numberPages){
        this.pageEvent.emit(this.currentPage+index)
      }else if(this.currentPage===1&&index===1){
        this.pageEvent.emit(this.currentPage+index)
      }else if(this.currentPage===this.numberPages&&index===-1){
        this.pageEvent.emit(this.currentPage+index)
      }else{
        this.pageEvent.emit(0)
      }
    }else{
      this.pageEvent.emit(index)
    }
  }
}
