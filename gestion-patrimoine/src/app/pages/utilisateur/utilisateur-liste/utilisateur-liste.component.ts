import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
// import * as pdfMake from 'pdfmake/build/pdfmake';
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import { IUtilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { UtilisateurAjouterComponent } from '../utilisateur-ajouter/utilisateur-ajouter.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-utilisateur-liste',
  templateUrl: './utilisateur-liste.component.html',
  styleUrls: ['./utilisateur-liste.component.css'],
})
export class UtilisateurListeComponent implements OnInit, OnDestroy {

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
  utilisateurs$: Observable<IUtilisateur[]> = of();
  // recherche custom
  searchTermsFilterDoubleUsernameEmail = new Subject<string>();
  termeRechercheUsernameEmail: string = "";
  utilisateurFilterDoubleUsernameEmail$: Observable<IUtilisateur[]> = of();
  /* ----------------------------------------------------------------------------------------- */

  utilisateurs: IUtilisateur[] = [];

  /* ----------------------------------------------------------------------------------------- */
  // tableau
  rowNumber!: number; // numéro de ligne pour le tableau
  columnsDateFormat: string[] = ['dateNaissance'];
  columnsToHide: string[] = [];
  dataSource = new MatTableDataSource<IUtilisateur>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'N°',
    'username',
    'email',
    'dateNaissance',
    'lieuNaissance',
  ];
  displayedColumnsCustom: string[] = [
    'N°',
    'Username',
    'Email',
    'Date Naissance',
    'lieu Naissance',
  ];

  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private matDialog: MatDialog,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    /* ----------------------------------------------------------------------------------------- */
    // menu
    const coll = this.el.nativeElement.getElementsByClassName('collapsible');
    for (let i = 0; i < coll.length; i++) {
      this.renderer.listen(coll[i], 'click', () => {
        coll[i].classList.toggle('active');
        const content = coll[i].nextElementSibling;
        if (content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
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
    this.utilisateurs$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) =>
        this.utilisateurService.searchUtilisateurList(term, this.utilisateurs)
      )
      // {.....List(ab)............List(abc)......}
    );
    this.utilisateurFilterDoubleUsernameEmail$ = this.searchTermsFilterDoubleUsernameEmail.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.utilisateurService.searchUtilisateurListFilterDouble(term, this.utilisateurs))
      // {.....List(ab)............List(abc)......}
    );
    /* ----------------------------------------------------------------------------------------- */
  }


  generatePDF(): void {

    const data: IUtilisateur[] = this.dataSource.filteredData;

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
    const tableData = data.map((item: IUtilisateur) => [
      item.rowNumber,
      item.username,
      item.email,
      `${new Date(item.dateNaissance).getDate()} ${months[new Date(item.dateNaissance).getMonth()]} ${new Date(item.dateNaissance).getFullYear() % 100}`,
      item.lieuNaissance,
      JSON.stringify(item.vehicules)
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
          { content: 'Utilisateur', styles: { fontSize: 5 } },
          { content: 'Email', styles: { fontSize: 5 } },
          { content: 'Date Naissance', styles: { fontSize: 5 } },
          { content: 'Lieu Naissance', styles: { fontSize: 5 } },
          { content: 'Véhicules', styles: { fontSize: 5 } }
        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell, styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
      theme: 'plain'
    });

    // Sauvegarder le PDF avec un nom de fichier
    doc.save('utilisateur-liste.pdf');
  }

  /* ----------------------------------------------------------------------------------------- */
  //  générer un pdf avec Pdfmake
  // generatePDF(): void {
  //   const months = [
  //     'JANV.',
  //     'FÉVR.',
  //     'MARS',
  //     'AVR.',
  //     'MAI',
  //     'JUIN',
  //     'JUIL.',
  //     'AOÛT',
  //     'SEPT.',
  //     'OCT.',
  //     'NOV.',
  //     'DÉC.',
  //   ];

  //   const utilisateursData = this.utilisateurs.map((utilisateur) => {
  //     return [
  //       utilisateur.username,
  //       utilisateur.email,
  //       `${new Date(utilisateur.dateNaissance).getDate()} ${months[new Date(utilisateur.dateNaissance).getMonth()]} ${new Date(utilisateur.dateNaissance).getFullYear() % 100}`,
  //       utilisateur.lieuNaissance,
  //     ];
  //   });

  //   const documentDefinition = {
  //     pageSize: { width: 460, height: 460 },

  //     content: [
  //       {
  //         text: 'Liste des utilisateurs',
  //         style: 'header',
  //         absolutePosition: { x: 20, y: 17 },
  //       },
  //       {
  //         table: {
  //           style: 'tableStyle',
  //           headerRows: 1,

  //           widths: [82],

  //           body: [
  //             [
  //               { text: 'Username', style: 'header' },
  //               { text: 'Email', style: 'header' },
  //               { text: 'Date Naissance', style: 'header' },
  //               { text: 'Lieu Naissancee', style: 'header' },
  //             ],
  //             ...utilisateursData,
  //           ],
  //         },
  //         layout: 'lightHorizontalLines',
  //       },
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 10,
  //         bold: true,
  //       },
  //     },
  //     tableStyle: {
  //       tableWidth: 'auto',
  //     },
  //   };

  //   pdfMake.createPdf(documentDefinition).open();
  // }

  search(term: string): void {
    this.termeRechercheUsernameEmail = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleUsernameEmail.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  FilterDoubleUsernameEmail(termeRechercheUsernameEmail: string) {
    this.termeRechercheUsernameEmail = termeRechercheUsernameEmail;
    this.myInputSearch.nativeElement.value = termeRechercheUsernameEmail;
    this.dataSource.filter = termeRechercheUsernameEmail.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }

  isNumber(termeRechercheUsernameEmail: string): boolean {
    return !isNaN(Number(termeRechercheUsernameEmail))
  }

  recupererUtilisateurs(): void {
    const subscription = this.utilisateurService.getUtilisateurs().subscribe({
      next: (donnees: IUtilisateur[]) => {
        this.utilisateurs = donnees.sort((a, b) =>
          a.username.localeCompare(b.username)
        );

        this.rowNumber = 1;

        // this.dataSource = new MatTableDataSource<IUtilisateur>(this.utilisateurs);
        this.dataSource = new MatTableDataSource<IUtilisateur>(
          this.utilisateurs.map((item) => ({
            ...item,
            rowNumber: this.rowNumber++,
          }))
        );

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
    const dialogRef = this.matDialog.open(UtilisateurAjouterComponent, {
      width: '80%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  goToDetailUtilisateur(utilisateur: IUtilisateur): void {
    this.router.navigate(['/gestion-utilisateur/detail', utilisateur.utilisateurId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
