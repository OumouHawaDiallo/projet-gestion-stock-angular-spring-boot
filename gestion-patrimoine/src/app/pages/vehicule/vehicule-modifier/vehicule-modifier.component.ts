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

    this.serviceService.putVehicule(this.vehiculeForm.value, this.vehicule.element.id).subscribe(

      data => {

        this.actualiserPage();

        this.popupFermer();
         this.goToVehiculeListe();
      },
      erreurs =>  {

        console.log(erreurs);
      }
    );
  }

  goToVehiculeListe() {
      this.router.navigate(['gestion-vehicule']);
    }


  ngOnInit(): void {


    this.vehicule = this.data;
    // console.log(this.bureauEdit.bureau);

    this.vehiculeForm = this.fb.group({

      numeroChassis: new FormControl(this.vehicule.element.numeroChassis, [
        Validators.required

      ]),

      couleur: new FormControl(this.vehicule.element.couleur, [
        Validators.required,

      ]),
      dateLivraison: new FormControl(this.vehicule.element.dateLivraison, [
        Validators.required,

      ]),
      numeroMatricule: new FormControl(this.vehicule.element.numeroMatricule, [
        Validators.required

      ]),

      transmission: new FormControl(this.vehicule.element.transmission, [
        Validators.required,

      ]),
      energie: new FormControl(this.vehicule.element.energie, [
        Validators.required,

      ]),
      modele: new FormControl(this.vehicule.element.modele, [
        Validators.required,

      ]),
      dateFabrication: new FormControl(this.vehicule.element.dateFabrication, [
        Validators.required,

      ]),

      etat: new FormControl(this.vehicule.element.etat, [
        Validators.required,

      ]),
      marque: new FormControl(this.vehicule.element.marque, [
        Validators.required,

      ]),
      dateCommande: new FormControl(this.vehicule.element.dateCommande, [
        Validators.required,

      ]),
      typeVehicule: new FormControl(this.vehicule.element.typeVehicule, [
        Validators.required,

      ])

    });
  }

  popupFermer() {
    this.Ref.close();
  }

  onSubmit(): void {
    // console.log(this.bureauForm.value);
    this.ModifierVehicule();
  }

  actualiserPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['gestion-vehicule'], {
      queryParams: {
        concat: this.concat
      }
    });

  }




}
