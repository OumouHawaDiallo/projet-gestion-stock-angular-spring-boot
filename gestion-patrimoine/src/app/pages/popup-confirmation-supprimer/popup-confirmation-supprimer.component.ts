import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpRespone } from 'src/app/models/custom-http-response';
import { NotificationService } from 'src/app/services/notification.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { VehiculeService } from 'src/app/services/vehicule.service';

@Component({
  selector: 'app-popup-confirmation-supprimer',
  templateUrl: './popup-confirmation-supprimer.component.html',
  styleUrls: ['./popup-confirmation-supprimer.component.css']
})
export class PopupConfirmationSupprimerComponent implements OnInit, OnDestroy {

  informations: any;

  private subscriptions: Subscription[] = [];

  constructor(
    private vehiculeService: VehiculeService,
    private utilisateurService: UtilisateurService,
    public dialogRef: MatDialogRef<PopupConfirmationSupprimerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private notificationService: NotificationService
  ) { }


  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }


  supprimeronfirmer(id: String, categorie: string): void {

    if (categorie === "vehicule") {
      this.subscriptions.push(
        this.vehiculeService.deleteVehicule(id).subscribe({
          next: (response: CustomHttpRespone) => {
            this.popupFermer();
            this.sendNotification(NotificationType.SUCCESS, response.message);
          },
          error: (erreurs: HttpErrorResponse) => {
            console.log(erreurs);
          }
        })
      );
    } else if (categorie === "utilisateur") {
      this.subscriptions.push(
        this.utilisateurService.deleteUtilisateur(id).subscribe({
          next: (response: CustomHttpRespone) => {
            this.popupFermer();
            this.sendNotification(NotificationType.SUCCESS, response.message);
          },
          error: (erreurs: HttpErrorResponse) => {
            console.log(erreurs);
          }
        })
      );
    }
    
  }

  ngOnInit(): void {
    this.informations = this.data;
  }


  popupFermer(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}