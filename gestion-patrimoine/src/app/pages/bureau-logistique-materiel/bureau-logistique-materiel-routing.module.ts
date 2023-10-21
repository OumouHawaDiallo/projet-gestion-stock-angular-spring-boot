import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculeListeComponent } from './vehicule/vehicule-liste/vehicule-liste.component';

const routes: Routes = [

  { path: 'gestion-vehicule', component: VehiculeListeComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BureauLogistiqueMaterielRoutingModule { }
