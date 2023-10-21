import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ErreurComponent } from './pages/erreur/erreur.component';
import { VehiculeListeComponent } from './pages/bureau-logistique-materiel/vehicule/vehicule-liste/vehicule-liste.component';
import { UtilisateurListeComponent } from './pages/utilisateur/utilisateur-liste/utilisateur-liste.component';
import { UtilisateurDetailComponent } from './pages/utilisateur/utilisateur-detail/utilisateur-detail.component';
import { UtilisateurModifierComponent } from './pages/utilisateur/utilisateur-modifier/utilisateur-modifier.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },

  { path: 'gestion-utilisateur', component: UtilisateurListeComponent },
  { path: 'gestion-utilisateur/detail/:id', component: UtilisateurDetailComponent },
  { path: 'gestion-utilisateur/modifier/:id', component: UtilisateurModifierComponent },

  { path: 'erreur', component: ErreurComponent },
  { path: '', redirectTo: 'gestion-utilisateur', pathMatch: 'full' },
  { path: '**', redirectTo: 'erreur', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
