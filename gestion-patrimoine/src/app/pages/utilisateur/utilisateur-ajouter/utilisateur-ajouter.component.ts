import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { IUtilisateur } from 'src/app/models/utilisateur';
import { NotificationService } from 'src/app/services/notification.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-utilisateur-ajouter',
  templateUrl: './utilisateur-ajouter.component.html',
  styleUrls: ['./utilisateur-ajouter.component.css']
})
export class UtilisateurAjouterComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];


  public utilisateurForm!: FormGroup;

  constructor(
    // private router: Router,
    private utilisateurService: UtilisateurService,
    // private validationService: ValidationService,
    public dialogRef: MatDialogRef<UtilisateurAjouterComponent>,
    private notificationService: NotificationService
  ) {}

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  AjouterUtilisateur(): void {
    const subscription = this.utilisateurService.postUtilisateur(this.utilisateurForm.value).subscribe({
      next: (utilisateur: IUtilisateur) => {
        this.popupFermer();
        this.sendNotification(NotificationType.SUCCESS, `Ajout réussie de ${utilisateur.username}`);
      },
      error: (erreurs: any) => {
        console.log(erreurs);
      },
    });

    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {

    this.utilisateurForm = new FormGroup({

      username: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      dateNaissance: new FormControl('', [
        Validators.required
      ]),
      lieuNaissance: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit(): void {
    // console.log(this.utilisateurForm.value);
    this.AjouterUtilisateur();
  }

  popupFermer(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
