import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { getUrl, getImageId } from '../../shared/utilities';

@Component({
  selector: 'bh-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input()
  exercise!: any;
  @Input()
  onRutine!: boolean;
  @Input()
  exerciseCheck: boolean = false;

  exerciseImagen: string;
  roles: string[];
  isAdmin = false;
  @Output()
  checkEvent = new EventEmitter<boolean>();
  constructor(
    private exercisesService: ExercisesService,
    private cloudinaryService: CloudinaryService,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.exerciseImagen = getUrl(this.exercise.imagen);
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  borrar(id: number) {
    // console.log('e1: ', id);
    this.spinner.show();
    this.exercisesService.delete(id).subscribe(
      (data) => {
        const imgId = getImageId(this.exercise.imagen);
        if (imgId != null) {
          this.cloudinaryService.deleteImage(imgId).subscribe(
            (data) => {
              console.log('imagen eliminado');
            },
            (err) => {
              console.log('Error: ', err.meesage);
            }
          );
        }
        this.spinner.hide();
        window.location.reload();
      },
      (err) => {
        this.spinner.hide();
        console.log('Error: ', err.meesage);
      }
    );
  }
  onCheckChange(event) {
    if (event.target.checked) {
      this.checkEvent.emit(true);
    } else {
      this.checkEvent.emit(false);
    }
  }
}
