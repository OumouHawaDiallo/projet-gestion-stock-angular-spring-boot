import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ErreurComponent } from './pages/erreur/erreur.component';
import { VehiculeListeComponent } from './pages/vehicule/vehicule-liste/vehicule-liste.component';
import { VehiculeDetailComponent } from './pages/vehicule/vehicule-detail/vehicule-detail.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'gestion-vehicule', component: VehiculeListeComponent },
  { path: 'erreur', component: ErreurComponent },
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: '**', redirectTo: 'erreur', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
