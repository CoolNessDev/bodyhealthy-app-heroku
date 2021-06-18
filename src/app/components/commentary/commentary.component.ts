import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Commentary } from 'src/app/models/commentary';
import { CommmentaryService } from 'src/app/services/commentary.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'bh-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.css'],
})
export class CommentaryComponent implements OnInit {
  spinnerMessage: string = 'Actualizando';
  @Input()
  commentary: Commentary;
  format: string = 'dd/MM/yyyy';

  options: boolean = false;
  constructor(
    private userService: UserService,
    private commentaryService: CommmentaryService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (
      this.commentary &&
      this.commentary.usuario.idUsuario ==
        parseInt(this.userService.getUserId())
    ) {
      this.options = true;
    }
  }
  onDelete = () => {
    this.spinnerMessage = 'Eliminando';
    this.spinner.show();
    this.commentaryService
      .deleteCommentary(this.commentary.idComentario)
      .subscribe(
        (data) => {
          // console.log(data);
          this.spinner.hide();
          window.location.reload();
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
  };
}
