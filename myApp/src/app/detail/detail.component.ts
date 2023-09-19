import { Component } from '@angular/core';
import { ModifierComponent } from '../modifier/modifier.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  constructor(
    // private dialogService: DialogService,
    private matDialog: MatDialog,
  ) { }

  popupModifier() {
    this.matDialog.open(
      ModifierComponent,
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
