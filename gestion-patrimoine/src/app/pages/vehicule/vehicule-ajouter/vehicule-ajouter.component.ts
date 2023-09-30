import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IVehicule } from 'src/app/models/vehicule';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-ajouter',
  templateUrl: './vehicule-ajouter.component.html',
  styleUrls: ['./vehicule-ajouter.component.css']
})
export class VehiculeAjouterComponent {

vehicule: IVehicule | undefined;


  public vehiculeForm!: FormGroup;

  constructor(
    private router: Router,
    private serviceService: ServicesService,
    private Ref: MatDialogRef<VehiculeAjouterComponent>,
    private renderer: Renderer2
  ) { }

  ajouterVehicule() {

    this.serviceService.postVehicule(this.vehiculeForm.value).subscribe(
      {
        next: (data: IVehicule) => {
          this.vehicule = data;
          console.log(data);
          this.goToVehiculeListe();
        },
        error: (erreurs: any) => {
          console.log(erreurs);
        }
      }
    );

  }



  goToVehiculeListe() {
    this.router.navigate(['gestion-vehicule']);
  }

  ngOnInit(): void {
    this.vehiculeForm = new FormGroup({

      numeroChassis: new FormControl(null, [
        Validators.required

      ]),
      couleur: new FormControl('', [
        Validators.required,

      ]),
      dateLivraison: new FormControl('', [
        Validators.required,

      ]),
      numeroMatricule: new FormControl(null, [
        Validators.required

      ]),
      transmission: new FormControl('', [
        Validators.required,

      ]),
      energie: new FormControl('', [
        Validators.required,

      ]),
      modele: new FormControl('', [
        Validators.required,

      ]),
      dateFabrication: new FormControl('', [
        Validators.required,

      ]),
      etat: new FormControl('', [
        Validators.required,

      ]),
      marque: new FormControl('', [
        Validators.required,

      ]),
      dateCommande: new FormControl('', [
        Validators.required,

      ]),
      typeVehicule: new FormControl('', [
        Validators.required,

      ])

    });

  }

  popupFermer() {
    this.Ref.close();
  }



  onSubmit(): void {
    console.log(this.vehiculeForm.value);

    this.ajouterVehicule();
  }



}
