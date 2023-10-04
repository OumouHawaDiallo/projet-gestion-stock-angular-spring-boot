import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VehiculeAjouterComponent } from '../vehicule-ajouter/vehicule-ajouter.component';
import { VehiculeDetailComponent } from '../vehicule-detail/vehicule-detail.component';
import {MatIconModule} from '@angular/material/icon';
import { ServicesService } from 'src/app/services/services.service';
import { IVehicule } from 'src/app/models/vehicule';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTable } from '@angular/material/table';
import { MatTableExporterDirective } from 'mat-table-exporter';



// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];


@Component({
  selector: 'app-interface1',
  templateUrl: './vehicule-liste.component.html',
  styleUrls: ['./vehicule-liste.component.css'],

})
export class VehiculeListeComponent  {

  // displayedColumns: string[] = ['position'];
  // dataSource = ELEMENT_DATA;

  vehicules: IVehicule[] = [];

  dataSource = new MatTableDataSource<IVehicule>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatTable) table!: MatTable<any>;
  // @ViewChild(MatTableExporterDirective) exporter!: MatTableExporterDirective;









  constructor(
    // private router: Router,
    // private route: ActivatedRoute,
    private servicesService: ServicesService,
    // private dialogService: DialogService,
    private matDialog: MatDialog,

    private el: ElementRef, private renderer: Renderer2

  ) { }





  recupererVehicules() {
    this.servicesService.getVehicules().subscribe({
      next: (donnees: IVehicule[]) => {
        this.vehicules = donnees;

        this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
        this.dataSource.paginator = this.paginator;
      },
      error: (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    });
  }

  displayedColumns: string[] = ['numeroChassis','numeroMatricule','couleur'];



  ngOnInit(): void {
    this.recupererVehicules();
  }


  ngAfterViewInit() {
    const coll = this.el.nativeElement.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
      this.renderer.listen(coll[i], "click", () => {
        coll[i].classList.toggle("active");
        const content = coll[i].nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }




  }

  popupAjouter() {
    this.matDialog.open(
      VehiculeAjouterComponent,
      {
        width:'80%',

        enterAnimationDuration:'500ms',
        exitAnimationDuration:'500ms',
        data: {
          concat: []
        }
      }
    );
  }

  popupDetail(element: any) {
    this.matDialog.open(
      VehiculeDetailComponent,
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






  // tableau

  // displayedColumns: string[] = [
  //   "id",
  //   "numeroChassis",
  //   "numeroMatricule",
  //   "modele",
  //   "couleur"

  // ];

  // "id"
  // "numeroChassis"
  // "numeroMatricule"
  // "modele"
  // "marque"
  // "transmission"
  // "couleur"
  // "dateFabrication"
  // "dateCommande"
  // "dateLivraison"
  // "energie"
  // "etat"
  // "typeVehicule"


  // dataSource = new MatTableDataSource<IVehicule>(ELEMENT_DATA);
  // dataSource = new MatTableDataSource<IVehicule>(this.vehicules);


  // @ViewChild(MatPaginator) paginator!: MatPaginator;

}



