import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IUtilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-utilisateur-ajouter',
  templateUrl: './utilisateur-ajouter.component.html',
  styleUrls: ['./utilisateur-ajouter.component.css']
})
export class UtilisateurAjouterComponent {



  public utilisateurForm!: FormGroup;

  constructor(
    // private router: Router,
    private utilisateurService: UtilisateurService,
    private validationService: ValidationService,
    public dialogRef: MatDialogRef<UtilisateurAjouterComponent>
  ) {}

  AjouterUtilisateur() {
    this.utilisateurService.postUtilisateur(this.utilisateurForm.value).subscribe({
      next: (donnee: IUtilisateur) => {
        this.popupFermer();
        this.actualiserPage();
      },
      error: (erreurs: any) => {
        console.log(erreurs);
      },
    });
  }

  ngOnInit(): void {

    this.utilisateurForm = new FormGroup({

      username: new FormControl('', [
        Validators.required,

      ]),
      email: new FormControl('', [
        Validators.required,

      ]),

      dateNaissance: new FormControl('', [
        Validators.required
      ]),
      lieuNaissance: new FormControl('', [
        Validators.required,

      ])

    });
  }

  onSubmit(): void {
    // console.log(this.vehiculeForm.value);
    this.AjouterUtilisateur();
  }

  popupFermer() {
    this.dialogRef.close();

  }

  actualiserPage() {
    //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //   this.router.onSameUrlNavigation = 'reload';
    //   this.router.navigate(['gestion-vehicule']);

    location.reload();

  }


}
