import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUtilisateur } from '../models/utilisateur';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../models/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private urlServeur = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }



  // ----------------------------------------------------------------------------
  // RECHERCHER UTILISATEUR SANS DOUBLONS
  public searchUtilisateurListFilterDouble(term: string, listeUtilisateurs: IUtilisateur[]): Observable<IUtilisateur[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de utilisateur en fonction du terme de recherche
    const filteredUtilisateurs = listeUtilisateurs.filter((utilisateur) =>
    utilisateur.username.toString().includes(term.toLowerCase()) || utilisateur.email.toLowerCase().includes(term.toLowerCase())
    );

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredUtilisateurs1: IUtilisateur[] = filteredUtilisateurs.filter((item, index, self) =>
      index === self.findIndex((t) => (
          t.email === item.email || t.username === item.username
      ))
    );

    return of(filteredUtilisateurs1);
  }
  // ----------------------------------------------------------------------------

  // RECHERCHER Utilisateur
  public searchUtilisateurList(term: string, listeUtilisateurs: IUtilisateur[]): Observable<IUtilisateur[]> {

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

  public putUtilisateur(utilisateur: IUtilisateur): Observable<IUtilisateur> {
    return this.httpClient.put<IUtilisateur>(`${this.urlServeur}/ModifierUtilisateur`, utilisateur);
  }

  public deleteUtilisateur(utilisateurId: String): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerUtilisateurByUtilisateurId/${utilisateurId}`);
  }

  public getUtilisateurByUtilisateurId(utilisateurId: String):Observable<IUtilisateur> {
    return this.httpClient.get<IUtilisateur>(`${this.urlServeur}/UtilisateurByUtilisateurId/${utilisateurId}`);
  }
  // ----------------------------------------------------------------------------




}
