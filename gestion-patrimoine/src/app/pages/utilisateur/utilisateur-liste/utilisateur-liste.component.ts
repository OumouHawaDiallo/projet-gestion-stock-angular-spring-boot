import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IUtilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { UtilisateurAjouterComponent } from '../utilisateur-ajouter/utilisateur-ajouter.component';

@Component({
  selector: 'app-utilisateur-liste',
  templateUrl: './utilisateur-liste.component.html',
  styleUrls: ['./utilisateur-liste.component.css']
})
export class UtilisateurListeComponent {

  /* ----------------------------------------------------------------------------------------- */
  focusOnInput: boolean = false;

  @ViewChild('monDiv', { static: true }) monDiv: ElementRef | undefined;

  divClique() {
    // Code à exécuter lorsque l'élément <div> est cliqué
    // Par exemple, vous pouvez modifier une variable ou déclencher une action
    // console.log('L\'élément <div> a été cliqué !');
    this.focusOnInput = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Vérifie si le clic a eu lieu en dehors de l'élément monDiv
    if (!this.monDiv?.nativeElement.contains(event.target)) {
      // Code à exécuter lorsque le clic est en dehors de monDiv
      // console.log('Clic en dehors de monDiv détecté.');
      this.focusOnInput = false;
    }
  }
  /* ----------------------------------------------------------------------------------------- */




  /* ----------------------------------------------------------------------------------------- */
  // rechercher
  // searchTerms = new Subject<string>();
  // vehicules$: Observable<IVehicule[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  utilisateurs: IUtilisateur[] = [];

  /* ----------------------------------------------------------------------------------------- */
  // tableau
  rowNumber!: number; // numéro de ligne pour le tableau
  columnsDateFormat: string[] = [
    "dateNaissance",

  ];
  // columnsToHide: string[] = [
  //   "transmission",
  //   "dateFabrication",
  //   "dateCommande",
  //   "dateLivraison",
  //   "energie",
  //   "etat",
  //   "typeVehicule"
  // ];
  dataSource = new MatTableDataSource<IUtilisateur>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "N°",
    "username",
    "email",
    "dateNaissance",
    "lieuNaissance"

  ];
  displayedColumnsCustom: string[] = [
    "N°",
    "Username",
    "Email",
    "Date Naissance",
    "lieu Naissance"

  ];

  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private matDialog: MatDialog,
    private el: ElementRef, private renderer: Renderer2
  ) { }


  ngAfterViewInit() {
    /* ----------------------------------------------------------------------------------------- */
    // menu
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
    /* ----------------------------------------------------------------------------------------- */
  }


  ngOnInit(): void {


    /* ----------------------------------------------------------------------------------------- */
    this.recupererUtilisateurs();
    /* ----------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    // this.vehicules$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      // debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      // distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      // switchMap((term) => this.vehiculeService.searchVehiculeList(term, this.vehicules))
      // {.....List(ab)............List(abc)......}
    // );
    /* ----------------------------------------------------------------------------------------- */
  }

//   generatePDF() {

//     const months = [
//       'JANV.',
//       'FÉVR.',
//       'MARS',
//       'AVR.',
//       'MAI',
//       'JUIN',
//       'JUIL.',
//       'AOÛT',
//       'SEPT.',
//       'OCT.',
//       'NOV.',
//       'DÉC.'
//     ];

//     const vehiculesData = this.vehicules.map((vehicule) => {
//       return [
//         vehicule.numeroChassis,
//         vehicule.numeroMatricule,
//         vehicule.modele,
//         vehicule.marque,
//         vehicule.couleur,
//         vehicule.transmission,
//         `${new Date(vehicule.dateFabrication).getDate()} ${months[new Date(vehicule.dateFabrication).getMonth()]} ${new Date(vehicule.dateFabrication).getFullYear() % 100}`,
//         `${new Date(vehicule.dateCommande).getDate()} ${months[new Date(vehicule.dateCommande).getMonth()]} ${new Date(vehicule.dateCommande).getFullYear() % 100}`,
//         `${new Date(vehicule.dateLivraison).getDate()} ${months[new Date(vehicule.dateLivraison).getMonth()]} ${new Date(vehicule.dateLivraison).getFullYear() % 100}`,
//         vehicule.energie,
//         vehicule.etat,
//         vehicule.typeVehicule
//       ];
//     });

//     const documentDefinition = {



//       pageSize: { width: 1200, height: 1200 },

//       content: [
//         { text: 'Liste des véhicules', style: 'header', absolutePosition: { x:20, y:10 }, },
//         {
//           table: {
//             style:'tableStyle',
//             headerRows: 1,

//             widths: [82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82],

//             body: [
//               [
//                 { text: 'N° Châssis', style: 'header' },
//                 { text: 'N° Matricule', style: 'header' },
//                 { text: 'Modèle', style: 'header' },
//                 { text: 'Marque', style: 'header' },
//                 { text: 'Couleur', style: 'header' },
//                 { text: 'Transmission', style: 'header' },
//                 { text: 'Date Fabrication', style: 'header' },
//                 { text: 'Date Commande', style: 'header' },
//                 { text: 'Date Livraison', style: 'header' },
//                 { text: 'Énergie', style: 'header' },
//                 { text: 'État', style: 'header' },
//                 { text: 'Type Véhicule', style: 'header' },
//               ],
//               ...vehiculesData,
//             ]
//           },
//           layout: 'lightHorizontalLines',
//         }
//       ],
//       styles: {
//         header: {
//           fontSize: 10,
//           bold: true,

//         },
//       },
//       tableStyle: {
//         tableWidth: 'auto',
//       },
//     };

//     pdfMake.createPdf(documentDefinition).open();
//   }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  recupererUtilisateurs() {
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (donnees: IUtilisateur[]) => {
        this.utilisateurs = donnees.sort((a, b) => a.id - b.id);

        this.rowNumber = 1;

        // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
        this.dataSource = new MatTableDataSource<IUtilisateur>(this.utilisateurs.map((item) => ({
          ...item,
          rowNumber: this.rowNumber++
        })));

        console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      },
      error: (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    });
  }

  // search(term: string) {
  //   this.searchTerms.next(term);
  // }


  popupAjouter() {
    const dialogRef = this.matDialog.open(
      UtilisateurAjouterComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms'
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }





  // actualiserPage() {
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate(['gestion-vehicule']);
  // }



}
