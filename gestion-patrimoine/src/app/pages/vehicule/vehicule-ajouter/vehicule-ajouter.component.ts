import { Component, OnInit, Renderer2 } from '@angular/core';
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
export class VehiculeAjouterComponent implements OnInit {

  vehicule: IVehicule | undefined;


    public vehiculeForm!: FormGroup;
    concat!: string;

    constructor(
      private router: Router,
      private serviceService: ServicesService,
      public dialogRef: MatDialogRef<VehiculeAjouterComponent>,
      private Ref: MatDialogRef<VehiculeAjouterComponent>,
    ) { }

    AjouterVehicule() {
      this.serviceService.postVehicule(this.vehiculeForm.value).subscribe(
        {
          next: (data: IVehicule) => {
            this.vehicule = data;
            console.log(data);
            // this.goToVehiculeListe();
             this.popupFermer();
             this.actualiserPage();
          },
          error: (erreurs: any) => {
            console.log(erreurs);
          }
        }
      );
    }



    // goToVehiculeListe() {
    //   this.router.navigate(['gestion-vehicule']);
    // }

    ngOnInit(): void {
      this.vehiculeForm = new FormGroup({

        numeroChassis: new FormControl(null, [
          Validators.required

        ]),
        couleur: new FormControl('Selectionner une couleur', [
          Validators.required,

        ]),
        dateLivraison: new FormControl('', [
          Validators.required,

        ]),
        numeroMatricule: new FormControl(null, [
          Validators.required

        ]),
        transmission: new FormControl('Selectionner une transmission', [
          Validators.required,

        ]),
        energie: new FormControl('Selectionner une energie', [
          Validators.required,

        ]),
        modele: new FormControl('', [
          Validators.required,

        ]),
        dateFabrication: new FormControl('', [
          Validators.required,

        ]),
        etat: new FormControl('Selectionner un etat', [
          Validators.required,

        ]),
        marque: new FormControl('Selectionner une marque', [
          Validators.required,

        ]),
        dateCommande: new FormControl('', [
          Validators.required,

        ]),
        typeVehicule: new FormControl('Selectionner un type vehicule', [
          Validators.required,

        ])
      });
    }


    onSubmit(): void {
      // console.log(this.vehiculeForm.value);
      this.AjouterVehicule();
    }

    popupFermer() {
      this.Ref.close();
    }

    actualiserPage() {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['gestion-vehicule'], {
        queryParams: {
          concat: this.concat
        }
      })
    }








}
