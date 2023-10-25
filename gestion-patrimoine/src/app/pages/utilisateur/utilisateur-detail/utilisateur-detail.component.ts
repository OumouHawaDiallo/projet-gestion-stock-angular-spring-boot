import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpRespone } from 'src/app/models/custom-http-response';
import { IUtilisateur } from 'src/app/models/utilisateur';
import { NotificationService } from 'src/app/services/notification.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { PopupConfirmationSupprimerComponent } from '../../popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-utilisateur-detail',
  templateUrl: './utilisateur-detail.component.html',
  styleUrls: ['./utilisateur-detail.component.css']
})
export class UtilisateurDetailComponent implements OnInit, OnDestroy {

  afficherDetail: boolean = true;

  private subscriptions: Subscription[] = [];

  // ----------------MODIFIER------------------------------
  public utilisateurForm!: FormGroup;
  // -------------------------------------------------------
  
  utilisateur!: IUtilisateur;

  constructor(
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private utilisateurService: UtilisateurService,
    private notificationService: NotificationService
  ) { }


  // ----------------MODIFIER------------------------------
  ModifierUtilisateur(): void {
    const subscription = this.utilisateurService.putUtilisateur(this.utilisateurForm.value).subscribe({
      next: (utilisateur: IUtilisateur) => {
        
        this.goToUtilisateurList();
        this.sendNotification(NotificationType.SUCCESS, `Modification réussie de ${utilisateur?.username}`);
      },
      error: (erreurs: any) => {
        console.log(erreurs);
      },
    });

    this.subscriptions.push(subscription);
  }
  // -------------------------------------------------------


  ngOnInit(): void {

    const utilisateurId: string|null = this.route.snapshot.paramMap.get('id');

    if(utilisateurId) {

      // this.utilisateurService.getUtilisateurByUtilisateurId(+utilisateurId).subscribe(pokemon => this.pokemon = pokemon);

      const subscription = this.utilisateurService.getUtilisateurByUtilisateurId(utilisateurId).subscribe({
        next: (donnee: IUtilisateur) => {
          this.utilisateur = donnee;
          
          // ----------------MODIFIER------------------------------
          this.utilisateurForm = new FormGroup({

            utilisateurId: new FormControl(donnee.utilisateurId, [
              Validators.required
            ]),
            username: new FormControl(donnee.username, [
              Validators.required
            ]),
            email: new FormControl(donnee.email, [
              Validators.required
            ]),
            dateNaissance: new FormControl(this.formatDate(donnee.dateNaissance.toString()), [
              Validators.required
            ]),
            lieuNaissance: new FormControl(donnee.lieuNaissance, [
              Validators.required
            ])
          });
          // -------------------------------------------------------
        },
        error: (erreurs: any) => {
          console.log(erreurs);
        },
      });

      this.subscriptions.push(subscription);
    }

    
    
    // ----------------MODIFIER------------------------------
    // this.utilisateurForm = new FormGroup({

    //   username: new FormControl("ibrahima", [
    //     Validators.required
    //   ]),
    //   email: new FormControl("", [
    //     Validators.required
    //   ]),
    //   dateNaissance: new FormControl("", [
    //     Validators.required
    //   ]),
    //   lieuNaissance: new FormControl("", [
    //     Validators.required
    //   ])
    // });
    // -------------------------------------------------------

  }

  // private sendNotification(notificationType: NotificationType, message: string): void {
  //   if (message) {
  //     this.notificationService.notify(notificationType, message);
  //   } else {
  //     this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
  //   }
  // }

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  supprimerUtilisateurById(utilisateurId: String): void {
    // this.subscriptions.push(
    //   this.utilisateurService.deleteUtilisateur(utilisateurId).subscribe({
    //     next: (response: CustomHttpRespone) => {
    //       this.goToUtilisateurList();
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
          id: utilisateurId,
          categorie: "utilisateur",
          message: "Voulez-vous supprimer cet utilisateur?"
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.goToUtilisateurList();
    });
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
  

  // ----------------MODIFIER------------------------------
  onSubmit(): void {
    // console.log(this.utilisateurForm.value);
    this.ModifierUtilisateur();
  }
  // -------------------------------------------------------


  goToUtilisateurList() {
    this.router.navigate(['/gestion-utilisateur']);
  }

  // goToModifierUtilisateur(utilisateurId: String) {
  //   this.router.navigate(['/gestion-utilisateur/modifier', utilisateurId]);
  // }

  afficherModifier(): void {
    this.afficherDetail = false;
  }

  retourDetail(): void {
    this.afficherDetail = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
