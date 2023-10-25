import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehiculeModifierComponent } from '../vehicule-modifier/vehicule-modifier.component';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpRespone } from 'src/app/models/custom-http-response';
import { SelectEnum } from 'src/app/enum/select-enum.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IVehicule } from 'src/app/models/vehicule';
import { ValidationService } from 'src/app/services/validation.service';
import { PopupConfirmationSupprimerComponent } from 'src/app/pages/popup-confirmation-supprimer/popup-confirmation-supprimer.component';

@Component({
  selector: 'app-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.css']
})
export class VehiculeDetailComponent implements OnInit, OnDestroy {

  afficherPopupDetail: boolean = true;

  private subscriptions: Subscription[] = [];

  vehicule: any;

  // ----------------------MODIFIER-------------------------------
  selectCouleur: string = SelectEnum.COULEUR;
  selectTransmission: string = SelectEnum.TRANSMISSION;
  selectEnergie: string = SelectEnum.ENERGIE;
  selectEtat: string = SelectEnum.ETAT;
  selectMarque: string = SelectEnum.MARQUE;
  selectTypeVehicule: string = SelectEnum.TYPE_VEHICULE;

  public vehiculeForm!: FormGroup;

  // --------------------------------------------------------------

  constructor(
    // private router: Router,
    private vehiculeService: VehiculeService,
    public dialogRef: MatDialogRef<VehiculeDetailComponent>,
    private validationService: ValidationService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private matDialog: MatDialog,
    private notificationService: NotificationService
  ) { }


  // ----------------------MODIFIER-------------------------------
  ModifierVehicule(): void {

    const subscription = this.vehiculeService.putVehicule(this.vehiculeForm.value).subscribe({
      next: (vehicule: IVehicule) => {
        this.popupFermer();
        this.sendNotification(NotificationType.SUCCESS, `Modification réussie de ${vehicule.marque}`);
      },
      error: (erreurs: any) => {
        console.log(erreurs);
      },
    });

    this.subscriptions.push(subscription);
  }
  // --------------------------------------------------------------


  ngOnInit(): void {
    this.vehicule = this.data;

    // ----------------------MODIFIER-------------------------------
    this.vehiculeForm = new FormGroup({

      vehiculeId: new FormControl(this.vehicule.vehiculeId, [
        Validators.required
      ]),
      numeroChassis: new FormControl(this.vehicule.numeroChassis, [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
      ]),
      couleur: new FormControl(this.vehicule.couleur, [
        Validators.required,
        this.validationService.validateCouleurSelection,
      ]),
      dateLivraison: new FormControl(this.formatDate(this.vehicule.dateLivraison), [
        Validators.required,
      ]),
      numeroMatricule: new FormControl(this.vehicule.numeroMatricule, [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
      ]),
      transmission: new FormControl(this.vehicule.transmission, [
        Validators.required,
        this.validationService.validateTransmissionSelection,
      ]),
      energie: new FormControl(this.vehicule.energie, [
        Validators.required,
        this.validationService.validateEnergieSelection,
      ]),
      modele: new FormControl(this.vehicule.modele, [
        Validators.required,
      ]),
      dateFabrication: new FormControl(this.formatDate(this.vehicule.dateFabrication), [
        Validators.required,
      ]),
      etat: new FormControl(this.vehicule.etat, [
        Validators.required,
        this.validationService.validateEtatSelection,
      ]),
      marque: new FormControl(this.vehicule.marque, [
        Validators.required,
        this.validationService.validateMarqueSelection,
      ]),
      dateCommande: new FormControl(this.formatDate(this.vehicule.dateCommande), [
        Validators.required,
      ]),
      typeVehicule: new FormControl(this.vehicule.typeVehicule, [
        Validators.required,
        this.validationService.validateTypeVehiculeSelection,
      ])
    });
    // --------------------------------------------------------------
  }

  // private sendNotification(notificationType: NotificationType, message: string): void {
  //   if (message) {
  //     this.notificationService.notify(notificationType, message);
  //   } else {
  //     this.notificationService.notify(notificationType, 'Une erreur s\'est produite. Veuillez réessayer.');
  //   }
  // }

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  supprimerVehiculeById(vehiculeId: String): void {
    // this.subscriptions.push(
    //   this.vehiculeService.deleteVehicule(vehiculeId).subscribe({
    //     next: (response: CustomHttpRespone) => {
    //       this.popupFermer();
    //       this.sendNotification(NotificationType.SUCCESS, response.message);
    //     },
    //     error: (erreurs: HttpErrorResponse) => {
    //       console.log(erreurs);
    //     }
    //   })
    // );

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: vehiculeId,
          categorie: "vehicule",
          message: "Voulez-vous supprimer ce véhicule?"
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.popupFermer();
    });
  }


  // ----------------------MODIFIER-------------------------------
  // popupModifier(element: any): void {
  //   this.dialogRef.close(); // fermer le popup detail avant
  //   this.matDialog.open(
  //     VehiculeModifierComponent,
  //     {
  //       width:'80%',
  //       enterAnimationDuration: '100ms',
  //       exitAnimationDuration: '100ms',
  //       data: element
  //     }
  //   );
  // }

  popupModifier(): void {
    this.afficherPopupDetail = false;
  }

  PopupDetail(): void {
    this.afficherPopupDetail = true;
  }
  // --------------------------------------------------------------

  popupFermer(): void {
    this.dialogRef.close();
  }


  // ----------------------MODIFIER-------------------------------
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
  // --------------------------------------------------------------


  // ----------------------MODIFIER-------------------------------
  onSubmit(): void {
    // console.log(this.vehiculeForm.value);
    this.ModifierVehicule();
  }
  // --------------------------------------------------------------


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
