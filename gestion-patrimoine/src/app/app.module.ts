import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ErreurComponent } from './pages/erreur/erreur.component';



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
// import { NotifierModule, NotifierOptions } from 'angular-notifier';

import localeFr from '@angular/common/locales/fr';
import { MatTableExporterModule } from 'mat-table-exporter';
import { UtilisateurAjouterComponent } from './pages/utilisateur/utilisateur-ajouter/utilisateur-ajouter.component';
import { UtilisateurListeComponent } from './pages/utilisateur/utilisateur-liste/utilisateur-liste.component';
import { UtilisateurModifierComponent } from './pages/utilisateur/utilisateur-modifier/utilisateur-modifier.component';
import { UtilisateurDetailComponent } from './pages/utilisateur/utilisateur-detail/utilisateur-detail.component';
import { BureauLogistiqueMaterielModule } from './pages/bureau-logistique-materiel/bureau-logistique-materiel.module';
import { LoaderComponent } from './pages/loader.component';
import { NgToastModule } from 'ng-angular-popup';
import { PopupConfirmationSupprimerComponent } from './pages/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { AccueilComponent } from './pages/accueil/accueil.component';




// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    ErreurComponent,
    UtilisateurAjouterComponent,
    UtilisateurListeComponent,
    UtilisateurModifierComponent,
    UtilisateurDetailComponent,
    LoaderComponent,
    PopupConfirmationSupprimerComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // ngif ngfor
    FormsModule,
    ReactiveFormsModule, // pour formGroup
    BrowserAnimationsModule,
    HttpClientModule, // pour le backend
    NgToastModule,
    // NotifierModule.withConfig(
    //   // customNotifierOptions1 // Custom options in here
    // ),


    NgbModule, // dropdown





    MatTableModule, MatPaginatorModule,

    // MatPaginator,

    MatExpansionModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,

    MatTableExporterModule,

    // MDCDialog

    BureauLogistiqueMaterielModule,
    AppRoutingModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
