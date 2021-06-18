import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Commentary } from 'src/app/models/commentary';
import { Publication } from 'src/app/models/publication';
import { User } from 'src/app/models/user';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { CommmentaryService } from 'src/app/services/commentary.service';
import { PublicationService } from 'src/app/services/publication.service';
import { UserService } from 'src/app/services/user.service';
import { getUrl } from 'src/app/shared/utilities';

@Component({
  selector: 'bh-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  spinnerMessage: string = 'Actualizando';
  commentaryForm: FormGroup;
  commentariesLoading: boolean = false;
  commentariesDrop: boolean = false;
  @Input()
  publication: Publication;
  @Input()
  imgSrc: string;
  // Main user
  user: User = new User();

  options: boolean = false;
  // Commentary
  commentary: Commentary = new Commentary();
  commentaries: Commentary[] = [];

  format: string = 'dd/MM/yyyy';
  getUrl=getUrl
  constructor(
    private commentaryService: CommmentaryService,
    private publicationService: PublicationService,
    private cloudinaryService: CloudinaryService,
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.commentaryForm = new FormGroup({
      message: new FormControl(null, Validators.required),
    });
    this.user.idUsuario = parseInt(this.userService.getUserId());
    this.user.nombres = this.userService.getNames();
    this.user.imagen = this.userService.getUserImg();
    if (
      this.publication &&
      this.publication.usuario.idUsuario == this.user.idUsuario
    ) {
      this.options = true;
    }
  }
  onComment = () => {
    this.spinnerMessage = 'Publicando';
    this.spinner.show();
    this.commentary.fecha = new Date();
    this.commentary.mensaje = this.message.value;
    this.commentary.usuario = this.user;
    this.commentary.publicacion = this.publication;
    this.commentaryService.postCommentary(this.commentary).subscribe(
      (data) => {
        // console.log(data);
        this.spinner.hide();
        this.commentaries.push(this.commentary)
        this.commentaryForm.get('message').setValue('')
        // window.location.reload();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  };
  fetchComentaries = () => {
    this.commentariesLoading = true;
    this.commentaryService
      .getComentariesByPublication(this.publication.idPublicacion)
      .subscribe(
        (data) => {
          this.commentaries = data;
          this.commentariesLoading = false;
          this.commentariesDrop = true;
        },
        (err) => {
          // if (err.status != 404) {
          //   console.log('Error: ', err);
          // }
          this.commentariesLoading = false;
          this.commentariesDrop = true;
        }
      );
  };
  onShowComentaries = () => {
    if (!this.commentariesDrop) {
      this.fetchComentaries();
    }
  };
  onDelete = () => {
    this.spinnerMessage = 'Eliminando publicaión';
    this.spinner.show();
    this.publicationService
      .deletePublication(this.publication.idPublicacion)
      .subscribe(
        (data) => {
          // console.log(data);
          if (this.publication.imagenId != null) {
            this.cloudinaryService
              .deleteImage(this.publication.imagenId)
              .subscribe(
                (data) => {
                  console.log('imagen eliminadaaa');
                  this.spinner.hide();
                  window.location.reload();
                },
                (err) => {
                  console.log('Error: ', err.message);
                  this.spinner.hide();
                }
              );
          }
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
        }
      );
  };
  private get message() {
    return this.commentaryForm.get('message');
  }
}
