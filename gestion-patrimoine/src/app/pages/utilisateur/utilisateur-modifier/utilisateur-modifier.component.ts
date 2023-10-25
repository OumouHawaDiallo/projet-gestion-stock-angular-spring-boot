import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpRespone } from 'src/app/models/custom-http-response';
import { IUtilisateur } from 'src/app/models/utilisateur';
import { NotificationService } from 'src/app/services/notification.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur-modifier',
  templateUrl: './utilisateur-modifier.component.html',
  styleUrls: ['./utilisateur-modifier.component.css']
})
export class UtilisateurModifierComponent {
// export class UtilisateurModifierComponent implements OnInit {
  
  // private subscriptions: Subscription[] = [];

  // utilisateur!: IUtilisateur;

  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private utilisateurService: UtilisateurService,
  //   private notificationService: NotificationService
  // ) { }


  // ngOnInit(): void {

  //   const utilisateurId: string|null = this.route.snapshot.paramMap.get('id');

  //   if(utilisateurId) {

  //     // this.utilisateurService.getUtilisateurByUtilisateurId(+utilisateurId).subscribe(pokemon => this.pokemon = pokemon);

  //     const subscription = this.utilisateurService.getUtilisateurByUtilisateurId(utilisateurId).subscribe({
  //       next: (donnee: IUtilisateur) => {
  //         this.utilisateur = donnee;
  //       },
  //       error: (erreurs: any) => {
  //         console.log(erreurs);
  //       },
  //     });

  //     this.subscriptions.push(subscription);
  //   }
  // }

  // // private sendNotification(notificationType: NotificationType, message: string): void {
  // //   if (message) {
  // //     this.notificationService.notify(notificationType, message);
  // //   } else {
  // //     this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
  // //   }
  // // }

  // private sendNotification(type: NotificationType, message: string, titre?: string): void {
  //   if (message) {
  //     this.notificationService.showAlert(type, message, titre);
  //   } else {
  //     this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
  //   }
  // }

  // supprimerUtilisateurById(utilisateurId: String): void {
  //   this.subscriptions.push(
  //     this.utilisateurService.deleteUtilisateur(utilisateurId).subscribe({
  //       next: (response: CustomHttpRespone) => {
  //         this.goToUtilisateurList();
  //         this.sendNotification(NotificationType.SUCCESS, response.message);
  //       },
  //       error: (erreurs: HttpErrorResponse) => {
  //         console.log(erreurs);
  //       }
  //     })
  //   );
  // }

  // goToUtilisateurList() {
  //   this.router.navigate(['/gestion-utilisateur']);
  // }

  // goToModifierUtilisateur(utilisateurId: String) {
  //   this.router.navigate(['/gestion-utilisateur/modifier', utilisateurId]);
  // }

}
