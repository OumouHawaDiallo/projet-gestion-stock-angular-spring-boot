import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ErreurComponent } from './pages/erreur/erreur.component';
import { VehiculeListeComponent } from './pages/bureau-logistique-materiel/vehicule/vehicule-liste/vehicule-liste.component';
import { UtilisateurListeComponent } from './pages/utilisateur/utilisateur-liste/utilisateur-liste.component';
import { UtilisateurDetailComponent } from './pages/utilisateur/utilisateur-detail/utilisateur-detail.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'gestion-vehicule', component: VehiculeListeComponent },
  { path: 'gestion-utilisateur', component: UtilisateurListeComponent },
  { path: 'gestion-utilisateur/detail/:id', component: UtilisateurDetailComponent },
  { path: 'erreur', component: ErreurComponent },
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: '**', redirectTo: 'erreur', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
