import { Component } from '@angular/core';

@Component({
  selector: 'app-modifier',
  templateUrl: './vehicule-modifier.component.html',
  styleUrls: ['./vehicule-modifier.component.css'],
})
// export class VehiculeModifierComponent implements OnInit, OnDestroy {
export class VehiculeModifierComponent {

  // private subscriptions: Subscription[] = [];

  // selectCouleur: string = SelectEnum.COULEUR;
  // selectTransmission: string = SelectEnum.TRANSMISSION;
  // selectEnergie: string = SelectEnum.ENERGIE;
  // selectEtat: string = SelectEnum.ETAT;
  // selectMarque: string = SelectEnum.MARQUE;
  // selectTypeVehicule: string = SelectEnum.TYPE_VEHICULE;

  // public vehiculeForm!: FormGroup;

  // vehicule: any;

  // constructor(
  //   // private router: Router,
  //   // private route: ActivatedRoute,
  //   private matDialog: MatDialog,
  //   private vehiculeService: VehiculeService,
  //   private validationService: ValidationService,
  //   public dialogRef: MatDialogRef<VehiculeModifierComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: string
  // ) {}

  // ModifierVehicule(): void {

  //   const subscription = this.vehiculeService.putVehicule(this.vehiculeForm.value).subscribe({
  //     next: () => {
  //       this.dialogRef.close();
  //       this.actualiserPage();
  //     },
  //     error: (erreurs: any) => {
  //       console.log(erreurs);
  //     },
  //   });

  //   this.subscriptions.push(subscription);
  // }

  // ngOnInit(): void {

  //   this.vehicule = this.data;

  //   this.vehiculeForm = new FormGroup({

  //     vehiculeId: new FormControl(this.vehicule.vehiculeId, [
  //       Validators.required
  //     ]),
  //     numeroChassis: new FormControl(this.vehicule.numeroChassis, [
  //       Validators.required,
  //       Validators.pattern('^[0-9]{5}$'),
  //     ]),
  //     couleur: new FormControl(this.vehicule.couleur, [
  //       Validators.required,
  //       this.validationService.validateCouleurSelection,
  //     ]),
  //     dateLivraison: new FormControl(this.formatDate(this.vehicule.dateLivraison), [
  //       Validators.required,
  //     ]),
  //     numeroMatricule: new FormControl(this.vehicule.numeroMatricule, [
  //       Validators.required,
  //       Validators.pattern('^[0-9]{5}$'),
  //     ]),
  //     transmission: new FormControl(this.vehicule.transmission, [
  //       Validators.required,
  //       this.validationService.validateTransmissionSelection,
  //     ]),
  //     energie: new FormControl(this.vehicule.energie, [
  //       Validators.required,
  //       this.validationService.validateEnergieSelection,
  //     ]),
  //     modele: new FormControl(this.vehicule.modele, [
  //       Validators.required,
  //     ]),
  //     dateFabrication: new FormControl(this.formatDate(this.vehicule.dateFabrication), [
  //       Validators.required,
  //     ]),
  //     etat: new FormControl(this.vehicule.etat, [
  //       Validators.required,
  //       this.validationService.validateEtatSelection,
  //     ]),
  //     marque: new FormControl(this.vehicule.marque, [
  //       Validators.required,
  //       this.validationService.validateMarqueSelection,
  //     ]),
  //     dateCommande: new FormControl(this.formatDate(this.vehicule.dateCommande), [
  //       Validators.required,
  //     ]),
  //     typeVehicule: new FormControl(this.vehicule.typeVehicule, [
  //       Validators.required,
  //       this.validationService.validateTypeVehiculeSelection,
  //     ])
  //   });
  // }

  // onSubmit(): void {
  //   // console.log(this.vehiculeForm.value);
  //   this.ModifierVehicule();
  // }

  // fermerPopup(): void {
  //   this.dialogRef.close();
  //   this.matDialog.open(
  //     VehiculeDetailComponent,
  //     {
  //       width: '80%',
  //       enterAnimationDuration: '100ms',
  //       exitAnimationDuration: '100ms',
  //       data: this.vehicule
  //     }
  //   );
  // }

  // // goToGestionVehicule(): void {
  // //   this.router.navigate(['gestion-vehicule']);
  // // }



  // formatDate(date: string): string {
  //   // const dateString = '2023-09-21T00:00:00.000+00:00';
  //   const dateObject = new Date(date);

  //   const year = dateObject.getFullYear();
  //   const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  //   const day = dateObject.getDate().toString().padStart(2, '0');
  //   // const hours = dateObject.getUTCHours().toString().padStart(2, '0');
  //   // const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
  //   // const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');

  //   // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //   // return formattedDate; // Affiche "2023-09-21 00:00:00"

  //   const formattedDate = `${year}-${month}-${day}`;
  //   return formattedDate; // Affiche "2023-09-21"
  // }


  // actualiserPage(): void {
  //   //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   //   this.router.onSameUrlNavigation = 'reload';
  //   //   this.router.navigate(['gestion-vehicule']);
  //   location.reload();
  // }


  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }


}
