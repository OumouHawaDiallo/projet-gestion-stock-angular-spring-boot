import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectEnum } from 'src/app/enum/select-enum';
import { IVehicule } from 'src/app/models/vehicule';
import { ValidationService } from 'src/app/services/validation.service';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { VehiculeAjouterComponent } from '../vehicule-ajouter/vehicule-ajouter.component';
import { VehiculeDetailComponent } from '../vehicule-detail/vehicule-detail.component';

@Component({
  selector: 'app-modifier',
  templateUrl: './vehicule-modifier.component.html',
  styleUrls: ['./vehicule-modifier.component.css'],
})
export class VehiculeModifierComponent {

  selectCouleur: string = SelectEnum.COULEUR;
  selectTransmission: string = SelectEnum.TRANSMISSION;
  selectEnergie: string = SelectEnum.ENERGIE;
  selectEtat: string = SelectEnum.ETAT;
  selectMarque: string = SelectEnum.MARQUE;
  selectTypeVehicule: string = SelectEnum.TYPE_VEHICULE;

  public vehiculeForm!: FormGroup;

  vehicule: any;

  constructor(
    // private router: Router,
    private vehiculeService: VehiculeService,
    private router: Router,
    private validationService: ValidationService,
    public dialogRef: MatDialogRef<VehiculeModifierComponent>,
    public dialogRef1: MatDialogRef<VehiculeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ModifierVehicule() {
    this.vehiculeService.putVehicule(this.vehiculeForm.value, this.vehicule.element.id).subscribe({
      next: (donnee: IVehicule) => {

       this.actualiserPage();
        this.dialogRef.close();


      },
      error: (erreurs: any) => {
        console.log(erreurs);
      },
    });
  }

  ngOnInit(): void {
    this.vehicule = this.data;

    this.vehiculeForm = new FormGroup({

      numeroChassis: new FormControl(this.vehicule.element.numeroChassis, [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
      ]),
      couleur: new FormControl(this.vehicule.element.couleur, [
        Validators.required,
        this.validationService.validateCouleurSelection,
      ]),
      dateLivraison: new FormControl(this.formatDate(this.vehicule.element.dateLivraison), [
        Validators.required,
      ]),
      numeroMatricule: new FormControl(this.vehicule.element.numeroMatricule, [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
      ]),
      transmission: new FormControl(this.vehicule.element.transmission, [
        Validators.required,
        this.validationService.validateTransmissionSelection,
      ]),
      energie: new FormControl(this.vehicule.element.energie, [
        Validators.required,
        this.validationService.validateEnergieSelection,
      ]),
      modele: new FormControl(this.vehicule.element.modele, [
        Validators.required,
      ]),
      dateFabrication: new FormControl(this.formatDate(this.vehicule.element.dateFabrication), [
        Validators.required,
      ]),
      etat: new FormControl(this.vehicule.element.etat, [
        Validators.required,
        this.validationService.validateEtatSelection,
      ]),
      marque: new FormControl(this.vehicule.element.marque, [
        Validators.required,
        this.validationService.validateMarqueSelection,
      ]),
      dateCommande: new FormControl(this.formatDate(this.vehicule.element.dateCommande), [
        Validators.required,
      ]),
      typeVehicule: new FormControl(this.vehicule.element.typeVehicule, [
        Validators.required,
        this.validationService.validateTypeVehiculeSelection,
      ])
    });
  }

  onSubmit(): void {
    // console.log(this.vehiculeForm.value);
    this.ModifierVehicule();
    this.dialogRef1.close();
  }

  fermerPopup() {
    this.dialogRef.close();
  }

  // goToGestionVehicule() {
  //   this.router.navigate(['gestion-vehicule']);
  // }



  formatDate(date: string): string {
    // const dateString = '2023-09-21T00:00:00.000+00:00';
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    // const hours = dateObject.getUTCHours().toString().padStart(2, '0');
    // const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
    // const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');

    // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // return formattedDate; // Affiche "2023-09-21 00:00:00"

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate; // Affiche "2023-09-21"
  }

  actualiserPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['gestion-vehicule'], {

    })
  }
}
