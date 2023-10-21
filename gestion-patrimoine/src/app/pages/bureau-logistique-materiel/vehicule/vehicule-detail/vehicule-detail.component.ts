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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.css']
})
export class VehiculeDetailComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  vehicule: any;

  constructor(
    // private router: Router,
    private vehiculeService: VehiculeService,
    public dialogRef: MatDialogRef<VehiculeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private matDialog: MatDialog,
    private toastrService:ToastrService,
    // private notificationService: NotificationService
  ) { }


  ngOnInit(): void {
    this.vehicule = this.data;
  }

  // private sendNotification(notificationType: NotificationType, message: string): void {
  //   if (message) {
  //     this.notificationService.notify(notificationType, message);
  //   } else {
  //     this.notificationService.notify(notificationType, 'Une erreur s\'est produite. Veuillez réessayer.');
  //   }
  // }

  showToast(){
    this.toastrService.error('un vehicule a été supprimé !','',{ positionClass:'custom-toast-position',timeOut:1000})
  }

  supprimerVehiculeById(vehiculeId: String): void {
    this.subscriptions.push(
      this.vehiculeService.deleteVehicule(vehiculeId).subscribe({
        next: (response: CustomHttpRespone) => {
          console.log(response);
          this.dialogRef.close();
          this.showToast();

          // this.sendNotification(NotificationType.SUCCESS, response.message);
        },
        error: (erreurs: HttpErrorResponse) => {
          console.log(erreurs);
        }
      })
    );
  }



  popupModifier(element: any): void {
    this.dialogRef.close(); // fermer le popup detail avant
    this.matDialog.open(
      VehiculeModifierComponent,
      {
        width:'80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: element
      }
    );
  }

  fermerPopup(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
