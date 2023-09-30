import { Component,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './vehicule-modifier.component.html',
  styleUrls: ['./vehicule-modifier.component.css']

})
export class VehiculeModifierComponent {

  concat!: string;


  public vehiculeForm!: FormGroup;

  public vehicule: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private serviceService: ServicesService,
    private Ref: MatDialogRef<VehiculeModifierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, // recuperer les donnees du bouton popup

  ) { }


  ModifierVehicule() {

    this.serviceService.putVehicule(this.vehiculeForm.value, this.vehicule.vehicule.id).subscribe(

      data => {


      },
      erreurs =>  {

        console.log(erreurs);
      }
    );
  }


  ngOnInit(): void {


    this.vehicule = this.data;
    // console.log(this.bureauEdit.bureau);

    this.vehiculeForm = this.fb.group({
      numeroChassis: new FormControl( this.vehicule.vehicule.numeroChassis, [
        Validators.required,

      ]),
      couleur: new FormControl( this.vehicule.vehicule.couleur, [
        Validators.required,

      ]),




    });
  }

  popupFermer() {
    this.Ref.close();
  }

  onSubmit(): void {
    // console.log(this.bureauForm.value);
    this.ModifierVehicule();
  }




}
