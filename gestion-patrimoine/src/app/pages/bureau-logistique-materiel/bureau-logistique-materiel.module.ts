import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BureauLogistiqueMaterielRoutingModule } from './bureau-logistique-materiel-routing.module';
import { VehiculeListeComponent } from './vehicule/vehicule-liste/vehicule-liste.component';
import { VehiculeAjouterComponent } from './vehicule/vehicule-ajouter/vehicule-ajouter.component';
import { VehiculeDetailComponent } from './vehicule/vehicule-detail/vehicule-detail.component';
import { VehiculeModifierComponent } from './vehicule/vehicule-modifier/vehicule-modifier.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [
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

    BureauLogistiqueMaterielRoutingModule
  ]
})
export class BureauLogistiqueMaterielModule { }
