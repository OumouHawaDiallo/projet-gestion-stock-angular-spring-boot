import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculeAjouterComponent } from '../vehicule-ajouter/vehicule-ajouter.component';
import { VehiculeDetailComponent } from '../vehicule-detail/vehicule-detail.component';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { IVehicule } from 'src/app/models/vehicule';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import { Margins } from 'pdfmake/interfaces';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-interface1',
  templateUrl: './vehicule-liste.component.html',
  styleUrls: ['./vehicule-liste.component.css']
})
export class VehiculeListeComponent implements OnInit, OnDestroy, AfterViewInit {


  private subscriptions: Subscription[] = [];



  /* ----------------------------------------------------------------------------------------- */
  focusOnInput: boolean = false;

  @ViewChild('monDiv', { static: true }) monDiv: ElementRef | undefined;

  divClique(): void {
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
  @ViewChild('myInputSearch') myInputSearch!: ElementRef;
  // rechercher
  searchTerms = new Subject<string>();
  vehicules$: Observable<IVehicule[]> = of();
  // recherche custom
  searchTermsFilterDoubleMatriculeMarque = new Subject<string>();
  termeRechercheMatriculeMarque: string = "";
  vehiculeFilterDoubleMatriculeMarque$: Observable<IVehicule[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  vehicules: IVehicule[] = [];

  /* ----------------------------------------------------------------------------------------- */
  // tableau
  rowNumber!: number; // numéro de ligne pour le tableau
  columnsDateFormat: string[] = [
    "dateFabrication",
    "dateCommande",
    "dateLivraison"
  ];
  columnsToHide: string[] = [
    "transmission",
    "dateFabrication",
    "dateCommande",
    "dateLivraison",
    "energie",
    "etat",
    "typeVehicule"
  ];
  dataSource = new MatTableDataSource<IVehicule>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "N°",
    "numeroChassis",
    "numeroMatricule",
    "modele",
    "marque",
    "couleur",
    "transmission",
    "dateFabrication",
    "dateCommande",
    "dateLivraison",
    "energie",
    "etat",
    "typeVehicule"
  ];
  displayedColumnsCustom: string[] = [
    "N°",
    "N° châssis",
    "N° matricule",
    "Modèle",
    "Marque",
    "Couleur",
    "Transmission",
    "Date Fabrication",
    "Date Commande",
    "Date Livraison",
    "Énergie",
    "État",
    "Type Véhicule"
  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    // private router: Router,
    // private route: ActivatedRoute,
    private vehiculeService: VehiculeService,
    private matDialog: MatDialog,
    private el: ElementRef, private renderer: Renderer2
  ) { }


  ngAfterViewInit(): void {
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
    this.recupererVehicules();
    /* ----------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.vehicules$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.vehiculeService.searchVehiculeList(term, this.vehicules))
      // {.....List(ab)............List(abc)......}
    );
    this.vehiculeFilterDoubleMatriculeMarque$ = this.searchTermsFilterDoubleMatriculeMarque.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.vehiculeService.searchVehiculeListFilterDouble(term, this.vehicules))
      // {.....List(ab)............List(abc)......}
    );

    /* ----------------------------------------------------------------------------------------- */
  }

  // generatePDF() {
  //   // Utilisez une condition pour décider quel ensemble de données utiliser
  //   if (this.dataSource.filter === '') {
  //     this.generatePDFFromList(this.dataSource.data); // Générer à partir de la liste complète
  //   } else {
  //     this.generatePDFFromList(this.dataSource.filteredData); // Générer à partir de la liste filtrée
  //   }
  // }

  generatePDF() {
    const data: IVehicule[] = this.dataSource.filteredData;
    const months = [
      'JANV.',
      'FÉVR.',
      'MARS',
      'AVR.',
      'MAI',
      'JUIN',
      'JUIL.',
      'AOÛT',
      'SEPT.',
      'OCT.',
      'NOV.',
      'DÉC.'
    ];

    const doc = new jsPDF();

    // Créez un tableau de données pour autoTable
    const tableData = data.map((item: IVehicule) => [
      item.rowNumber,
      item.numeroChassis,
      item.numeroMatricule,
      item.modele,
      item.marque,
      item.couleur,
      item.transmission,
      `${new Date(item.dateFabrication).getDate()} ${months[new Date(item.dateFabrication).getMonth()]} ${new Date(item.dateFabrication).getFullYear() % 100}`,
      `${new Date(item.dateCommande).getDate()} ${months[new Date(item.dateCommande).getMonth()]} ${new Date(item.dateCommande).getFullYear() % 100}`,
      `${new Date(item.dateLivraison).getDate()} ${months[new Date(item.dateLivraison).getMonth()]} ${new Date(item.dateLivraison).getFullYear() % 100}`,
      item.energie,
      item.etat,
      item.typeVehicule
    ]);

    // Configuration pour le PDF avec une taille de page personnalisée
    const pageWidth = 1000; // Largeur de la page en mm (A4 par défaut)
    const pageHeight = 1000; // Hauteur de la page en mm (A4 par défaut)
    const marginLeft = 10;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 10;

    // Générer le tableau dans le PDF avec des styles de texte personnalisés
    autoTable(doc, {
      head: [
        [
          { content: 'N°', styles: { fontSize: 5 } },
          { content: 'N° châssis', styles: { fontSize: 5 } },
          { content: 'Matricule', styles: { fontSize: 5 } },
          { content: 'Modèle', styles: { fontSize: 5 } },
          { content: 'Marque', styles: { fontSize: 5 } },
          { content: 'Couleur', styles: { fontSize: 5 } },
          { content: 'Transmission', styles: { fontSize: 5 } },
          { content: 'Date Fabrication', styles: { fontSize: 5 } },
          { content: 'Date Commande', styles: { fontSize: 5 } },
          { content: 'Date Livraison', styles: { fontSize: 5 } },
          { content: 'Énergie', styles: { fontSize: 5 } },
          { content: 'État', styles: { fontSize: 5 } },
          { content: 'Type Véhicule', styles: { fontSize: 5 } }
        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell, styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
      theme: 'plain'


    });


    // Sauvegarder le PDF avec un nom de fichier
    doc.save('liste_vehicule.pdf');
  }








  search(term: string): void {
    this.termeRechercheMatriculeMarque = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleMatriculeMarque.next(term);
  }



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  FilterDoubleMatriculeMarque(termeRechercheMatriculeMarque: string) {
    this.termeRechercheMatriculeMarque = termeRechercheMatriculeMarque;
    this.myInputSearch.nativeElement.value = termeRechercheMatriculeMarque;
    this.dataSource.filter = termeRechercheMatriculeMarque.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheMatriculeMarque: string): boolean {
    return !isNaN(Number(termeRechercheMatriculeMarque))
  }


  recupererVehicules(): void {
    const subscription = this.vehiculeService.getVehicules().subscribe({
      next: (donnees: IVehicule[]) => {
        // this.vehicules = donnees.sort((a, b) => a.numeroChassis - b.numeroChassis);
        this.vehicules = donnees.sort((a, b) => new Date(b.dateEnregistrement).getTime() - new Date(a.dateEnregistrement).getTime());

        this.rowNumber = 1;

        // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
        this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules.map((item) => ({
          ...item,
          rowNumber: this.rowNumber++
        })));

        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      },
      error: (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    });

    this.subscriptions.push(subscription);
  }



  popupAjouter(): void {
    const dialogRef = this.matDialog.open(
      VehiculeAjouterComponent,
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

  popupDetail(element: any): void {
    const dialogRef = this.matDialog.open(
      VehiculeDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: element
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}

