import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectEnum } from 'src/app/enum/select-enum';
import { IVehicule } from 'src/app/models/vehicule';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { ValidationService } from 'src/app/services/validation.service';
import { ToastrService } from 'ngx-toastr';
// import { ToastsManager } from 'ng2-toastr';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajouter',
  templateUrl: './vehicule-ajouter.component.html',
  styleUrls: ['./vehicule-ajouter.component.css'],
})
export class VehiculeAjouterComponent implements OnInit {


  selectCouleur: string = SelectEnum.COULEUR;
  selectTransmission: string = SelectEnum.TRANSMISSION;
  selectEnergie: string = SelectEnum.ENERGIE;
  selectEtat: string = SelectEnum.ETAT;
  selectMarque: string = SelectEnum.MARQUE;
  selectTypeVehicule: string = SelectEnum.TYPE_VEHICULE;

  public vehiculeForm!: FormGroup;

  constructor(
    // private router: Router,
    private vehiculeService: VehiculeService,
    private validationService: ValidationService,
    public dialogRef: MatDialogRef<VehiculeAjouterComponent>,
    private toastrService:ToastrService

  ) {}

  showToast(){
    this.toastrService.success('un vehicule a été ajouté !','',{ positionClass:'custom-toast-position',timeOut:5000})
  }

  AjouterVehicule() {
    this.vehiculeService.postVehicule(this.vehiculeForm.value).subscribe({
      next: (donnee: IVehicule) => {
        this.popupFermer();
        this.showToast();

      },
      error: (erreurs: any) => {
        console.log(erreurs);
      },
    });
  }

  ngOnInit(): void {

    this.vehiculeForm = new FormGroup({

      numeroChassis: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
        // Validators.pattern('^[0-9]{5}[A-HJ-NPR-Z0-9]{12}$'),
      ]),
      couleur: new FormControl(this.selectCouleur, [
        Validators.required,
        this.validationService.validateCouleurSelection
      ]),
      dateLivraison: new FormControl('', [
        Validators.required
      ]),
      numeroMatricule: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
      ]),
      transmission: new FormControl(this.selectTransmission, [
        Validators.required,
        this.validationService.validateTransmissionSelection
      ]),
      energie: new FormControl(this.selectEnergie, [
        Validators.required,
        this.validationService.validateEnergieSelection
      ]),
      modele: new FormControl('', [
        Validators.required
      ]),
      dateFabrication: new FormControl('', [
        Validators.required
      ]),
      etat: new FormControl(this.selectEtat, [
        Validators.required,
        this.validationService.validateEtatSelection
      ]),
      marque: new FormControl(this.selectMarque, [
        Validators.required,
        this.validationService.validateMarqueSelection
      ]),
      dateCommande: new FormControl('', [
        Validators.required
      ]),
      typeVehicule: new FormControl(this.selectTypeVehicule, [
        Validators.required,
        this.validationService.validateTypeVehiculeSelection
      ])
    });
  }

  onSubmit(): void {
    // console.log(this.vehiculeForm.value);
    this.AjouterVehicule();
  }

  popupFermer() {
    this.dialogRef.close();
  }

}
