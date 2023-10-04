import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehiculeModifierComponent } from '../vehicule-modifier/vehicule-modifier.component';
import { IVehicule } from 'src/app/models/vehicule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.css']
})
export class VehiculeDetailComponent implements OnInit {

  vehicule: any;
  concat!: string;


  constructor(
    // private dialogService: DialogService,
    public dialogRef: MatDialogRef<VehiculeDetailComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private matDialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.vehicule = this.data;
  }

  popupModifier(element: any) {
    this.matDialog.open(
      VehiculeModifierComponent,
      {
        width:'80%',
        enterAnimationDuration:'500ms',
        exitAnimationDuration:'500ms',
        data: {
          element

        }
      }

    );






  }



  fermerPopup() {

      this.dialogRef.close();

  }


  actualiserPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['gestion-vehicule'], {
      queryParams: {
        concat: this.concat
      }
    });

  }


}
