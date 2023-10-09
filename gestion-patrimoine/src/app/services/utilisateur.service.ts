import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUtilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private urlServeur = "http://localhost:8081";

  constructor(
    private httpClient: HttpClient
  ) { }


  // ----------------------------------------------------------------------------
  // RECHERCHER Utilisateur
  public searchUtilisateurList(
    term: string,
    listeUtilisateurs: IUtilisateur[]
  ): Observable<IUtilisateur[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste d' utilisateur en fonction du terme de recherche
    const filteredUtilisateur = listeUtilisateurs.filter((utilisateur) =>
      this.doesUtilisateurMatchTerm(utilisateur, term)
    );

    return of(filteredUtilisateur);
  }

  private doesUtilisateurMatchTerm(utilisateur: IUtilisateur, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du Pokémon
    const termLowerCase = term.toLowerCase();
    return (
      utilisateur.username.toLowerCase().includes(termLowerCase) ||
      utilisateur.email.toLowerCase().includes(termLowerCase) ||
      utilisateur.lieuNaissance.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------


  //  CRUD UTILISATEUR
  public getUtilisateurs():Observable<IUtilisateur[]> {
    return this.httpClient.get<IUtilisateur[]>(this.urlServeur+"/Utilisateurs");
  }

  public postUtilisateur(utilisateur: IUtilisateur): Observable<IUtilisateur> {
    return this.httpClient.post<IUtilisateur>(`${this.urlServeur}/AjouterUtilisateur`, utilisateur);
  }

  public putUtilisateur(utilisateur: IUtilisateur, idUtilisateur: number): Observable<IUtilisateur> {
    return this.httpClient.put<IUtilisateur>(`${this.urlServeur}/ModifierUtilisateur/${idUtilisateur}`, utilisateur);
  }

  public deleteUtilisateur(idUtilisateur: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlServeur}/SupprimerUtilisateur/${idUtilisateur}`);
  }

  public getUtilisateurByIdutilisateur(idUtilisateur: number):Observable<IUtilisateur> {
    return this.httpClient.get<IUtilisateur>(`${this.urlServeur}/UtilisateurById/${idUtilisateur}`);
  }




}
