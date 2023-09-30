import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehiculeModifierComponent } from '../vehicule-modifier/vehicule-modifier.component';

@Component({
  selector: 'app-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.css']
})
export class VehiculeDetailComponent {

  constructor(
    // private dialogService: DialogService,
    private matDialog: MatDialog,
  ) { }

  popupModifier() {
    this.matDialog.open(
      VehiculeModifierComponent,
      {
        width:'80%',

        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'2000ms',
        data: {
          concat: []
        }
      }
    );
  }

}
