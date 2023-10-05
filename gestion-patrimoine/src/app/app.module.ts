import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ErreurComponent } from './pages/erreur/erreur.component';
import { VehiculeListeComponent } from './pages/bureau-logistique-materiel/vehicule/vehicule-liste/vehicule-liste.component';
import { VehiculeAjouterComponent } from './pages/bureau-logistique-materiel/vehicule/vehicule-ajouter/vehicule-ajouter.component';
import { VehiculeDetailComponent } from './pages/bureau-logistique-materiel/vehicule/vehicule-detail/vehicule-detail.component';
import { VehiculeModifierComponent } from './pages/bureau-logistique-materiel/vehicule/vehicule-modifier/vehicule-modifier.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import localeFr from '@angular/common/locales/fr';
import { MatTableExporterModule } from 'mat-table-exporter';


// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    ErreurComponent,
    VehiculeListeComponent,
    VehiculeAjouterComponent,
    VehiculeDetailComponent,
    VehiculeModifierComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // ngif ngfor
    FormsModule,
    ReactiveFormsModule, // pour formGroup
    BrowserAnimationsModule,
    HttpClientModule, // pour le backend

    NgbModule, // dropdown

    AppRoutingModule,


    MatTableModule, MatPaginatorModule,

    // MatPaginator,

    MatExpansionModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,

    MatTableExporterModule

    // MDCDialog
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
