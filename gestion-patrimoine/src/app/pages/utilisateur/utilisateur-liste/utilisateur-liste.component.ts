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


  generatePDF() {
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
    const doc = new jsPDF;




    // Créez un tableau de données pour autoTable
    const tableData = data.map((item: IUtilisateur) => [
      item.rowNumber,
      item.username,
      item.email,
      `${new Date(item.dateNaissance).getDate()} ${months[new Date(item.dateNaissance).getMonth()]} ${new Date(item.dateNaissance).getFullYear() % 100}`,
      item.lieuNaissance,

    ]);

    // Configuration pour le PDF avec une taille de page personnalisée
    const pageWidth = 200; // Largeur de la page en mm (réduite)
    const pageHeight = 200; // Hauteur de la page en mm (par défaut)
   const marginLeft = 5;
   const marginTop = 5;
   const marginRight = 5; // Augmentation de la marge droite
  //  const marginBottom = 10;


    // Générer le tableau dans le PDF avec des styles de texte personnalisés
    autoTable(doc, {
      head: [
        [
          { content: 'N°', styles: { fontSize: 7 } },
          { content: 'Username', styles: { fontSize: 7 } },
          { content: 'Email', styles: { fontSize: 7 } },
          { content: 'Date naissance', styles: { fontSize: 7 } },
          { content: 'Lieu naissance', styles: { fontSize: 7} }

        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell, styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, left: marginLeft },
      theme: 'plain'


    });


    // Sauvegarder le PDF avec un nom de fichier
    doc.save('liste_utilisateur.pdf');
  }




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
          a.utilisateurId.localeCompare(b.utilisateurId)
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
