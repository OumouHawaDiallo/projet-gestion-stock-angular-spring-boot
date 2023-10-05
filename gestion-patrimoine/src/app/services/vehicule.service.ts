import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IVehicule } from '../models/vehicule';

@Injectable({
  providedIn: 'root',
})
export class VehiculeService {
  private urlServeur = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) {}

  // ----------------------------------------------------------------------------
  // RECHERCHER VEHICULE
  public searchVehiculeList(
    term: string,
    listeVehicules: IVehicule[]
  ): Observable<IVehicule[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de vehicule en fonction du terme de recherche
    const filteredVehicule = listeVehicules.filter((vehicule) =>
      this.doesVehiculeMatchTerm(vehicule, term)
    );

    return of(filteredVehicule);
  }

  private doesVehiculeMatchTerm(vehicule: IVehicule, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du Pokémon
    const termLowerCase = term.toLowerCase();
    return (
      vehicule.couleur.toLowerCase().includes(termLowerCase) ||
      vehicule.transmission.toLowerCase().includes(termLowerCase) ||
      vehicule.modele.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  //  CRUD VEHICULE
  public getVehicules(): Observable<IVehicule[]> {
    return this.httpClient.get<IVehicule[]>(this.urlServeur + '/Vehicules');
  }

  public postVehicule(vehicule: IVehicule): Observable<IVehicule> {
    return this.httpClient.post<IVehicule>(
      `${this.urlServeur}/AjouterVehicule`,
      vehicule
    );
  }

  public putVehicule(
    vehicule: IVehicule,
    idVehicule: number
  ): Observable<IVehicule> {
    return this.httpClient.put<IVehicule>(
      `${this.urlServeur}/ModifierVehicule/${idVehicule}`,
      vehicule
    );
  }

  public deleteVehicule(idVehicule: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.urlServeur}/SupprimerVehicule/${idVehicule}`
    );
  }

  public getVehiculeByIdvehicule(idVehicule: number): Observable<IVehicule> {
    return this.httpClient.get<IVehicule>(
      `${this.urlServeur}/VehiculeById/${idVehicule}`
    );
  }
}
// ----------------------------------------------------------------------------
