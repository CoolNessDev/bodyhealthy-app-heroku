import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Muscle } from 'src/app/models/muscle';
@Component({
  selector: 'bh-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css']
})
export class ExerciseFormComponent implements OnInit {
  exercise: Exercise= new Exercise();
  imagen: File;
  imagenMin: File;
  img: string;
  exerciseForm: FormGroup;
  newImg: boolean=false;
  muscles: Muscle[]=[];
  public musclesForm: Array<Muscle> = [
    {nombre: 'Abdominales', idMusculo: 1},
    {nombre: "Espalda", idMusculo: 2},
    {nombre: "Brazos", idMusculo: 3},
    {nombre: "Hombros", idMusculo: 4},
    {nombre: "Gluteos", idMusculo: 5},
    {nombre: "Piernas", idMusculo: 6}
  ];
  constructor(private exercisesService: ExercisesService,
    private cloudinaryService: CloudinaryService,
    private router: Router,
    private spinner: NgxSpinnerService) { }


  ngOnInit(): void {
    this.initForm();
  }
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
  onFileChange(event) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
      this.newImg=true;
    };
    fr.readAsDataURL(this.imagen);
  }
  onCreate(): void {
    this.setValues();
    this.exercisesService.save(this.exercise).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigate(['/ejercicios']);
      },
      err => {
        this.spinner.hide();
        // this.router.navigate(['/']);
      }
    );
  }
  onUpload(): void {
    this.spinner.show();
    this.cloudinaryService.uploadImage(this.imagen).subscribe(
      data => {
        console.log("Subido: ", data.message);
        this.img=data.message;
        this.exercise.imagen=data.message;
        this.onCreate()


      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
  }

  initForm = (): void => {
    this.exerciseForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      duracion: new FormControl(null, Validators.required),
      series: new FormControl(null, Validators.required),
      repeticiones: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      descanso: new FormControl(null),
      musculo: new FormControl(null),
    });
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
    return this.exerciseForm.get('name');
  }
  private get duracion(){
    return this.exerciseForm.get('duracion');
  }
  private get series(){
    return this.exerciseForm.get('series');
  }
  public get repeticiones(){
    return this.exerciseForm.get('repeticiones');
  }
  private get descripcion(){
    return this.exerciseForm.get('descripcion');
  }
  private get descanso(){
    return this.exerciseForm.get('descanso');
  }

  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
  }
}
