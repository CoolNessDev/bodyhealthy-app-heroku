import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Exercise } from 'src/app/models/exercise';
import { Muscle } from 'src/app/models/muscle';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import {getUrl,getImageId} from '../../../shared/utilities';

@Component({
  selector: 'bh-exercise-update',
  templateUrl: './exercise-update.component.html',
  styleUrls: ['./exercise-update.component.css'],
})
export class ExerciseUpdateComponent implements OnInit {
  exercise: Exercise;

  imagen: File;
  imagenMin: File;

  spinnerMessage: string;

  exerciseUpdateForm: FormGroup;

  oldImg: string;
  img: string;
  newImg: boolean=false;

  muscles: Muscle[];
  mulsclesChecks: boolean[]=[false,false,false,false,false,false];
  public musclesForm: Array<Muscle> = [
    {nombre: 'Abdominales', idMusculo: 1},
    {nombre: "Espalda", idMusculo: 2},
    {nombre: "Brazos", idMusculo: 3},
    {nombre: "Hombros", idMusculo: 4},
    {nombre: "Gluteos", idMusculo: 5},
    {nombre: "Piernas", idMusculo: 6}
  ];
  constructor(
    private exercisesService: ExercisesService,
    private cloudinaryService: CloudinaryService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {}
  onCheckChange(event){
    if(event.target.checked){
      this.muscles.push(this.musclesForm[event.target.value-1]);
    }else{
      this.muscles=this.muscles.filter(i=>{
        return i.idMusculo!==this.musclesForm[event.target.value-1].idMusculo;
      })
    }
    this.exercise.musculos=this.muscles;
  }
  ngOnInit(): void {
    this.spinnerMessage="Obteniendo ejercicio";
    this.spinner.show();
    this.initForm();
    const id = this.activatedRoute.snapshot.params.id;
    this.exercisesService.detail(id).subscribe(
      (data) => {
        this.spinner.hide();
        this.exercise = data;
        this.loadData(data);
        this.oldImg=data.imagen;
        this.img=getUrl(data.imagen);
      },
      (err) => {
        this.spinner.hide();
        this.router.navigate(['/']);
      }
    );
  }
  onUpdate(): void {
    this.setValues();
    const id = this.activatedRoute.snapshot.params.id;
    this.exercisesService.update(id, this.exercise).subscribe(
      data => {
        this.router.navigate(['/ejercicios']);
        this.spinner.hide();
        const imgId = getImageId(this.oldImg);
        if (imgId != null&&this.newImg) {
          this.cloudinaryService.deleteImage(imgId).subscribe(
            (data) => {
              console.log('imagen eliminado');
            },
            (err) => {
              console.log('Error: ', err.message);
            }
          );
        }
      },
      err => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  onUpload(): void {
    this.spinnerMessage="Actualizando ejercicio";
    this.spinner.show();
    if(this.newImg){
      this.cloudinaryService.uploadImage(this.imagen).subscribe(
        data => {
          // console.log("Imagen subida: ", data.message);
          this.exercise.imagen=data.message;
          this.onUpdate()


        },
        err => {
          alert(err.error.mensaje);
          this.spinner.hide();
          this.reset();
        }
      );
    }else{
      this.onUpdate()
    }
  }
  onFileChange(event) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.newImg=true;
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }
  initForm = (): void => {
    this.exerciseUpdateForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      duracion: new FormControl(null, Validators.required),
      series: new FormControl(null, Validators.required),
      repeticiones: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      descanso: new FormControl(null),
    });
  };
  loadData = (data): void => {
    this.exerciseUpdateForm.get('name').setValue(data.nombre);
    this.exerciseUpdateForm.get('duracion').setValue(data.duracion);
    this.exerciseUpdateForm.get('series').setValue(data.series);
    this.exerciseUpdateForm.get('repeticiones').setValue(data.repeticiones);
    this.exerciseUpdateForm.get('descripcion').setValue(data.descripcion);
    this.exerciseUpdateForm.get('descanso').setValue(data.descanso);
    data.musculos.map(i=>{
      this.mulsclesChecks[i.idMusculo-1]=true;
    });
    this.exercise.musculos,this.muscles=data.musculos;
  };
  setValues(){
    this.exercise.nombre=this.name.value;
    this.exercise.duracion=this.duracion.value;
    this.exercise.series=this.series.value;
    this.exercise.repeticiones=this.repeticiones.value;
    this.exercise.descripcion=this.descripcion.value;
    this.exercise.descanso=this.descanso.value;
  }
  private get name(){
    return this.exerciseUpdateForm.get('name');
  }
  private get duracion(){
    return this.exerciseUpdateForm.get('duracion');
  }
  private get series(){
    return this.exerciseUpdateForm.get('series');
  }
  public get repeticiones(){
    return this.exerciseUpdateForm.get('repeticiones');
  }
  private get descripcion(){
    return this.exerciseUpdateForm.get('descripcion');
  }
  private get descanso(){
    return this.exerciseUpdateForm.get('descanso');
  }
  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
  }
}
