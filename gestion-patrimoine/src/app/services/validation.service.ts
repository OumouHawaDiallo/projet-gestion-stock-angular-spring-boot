import { Injectable } from '@angular/core';
import { IVehicule } from '../models/vehicule';
import { Observable, of } from 'rxjs';
import { SelectEnum } from '../enum/select-enum.enum';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  // ----------------------------------------------------------------------------
  // Fonction de validation personnalisée pour chaque select
  public validateCouleurSelection(control: { value: string; }) {
    if (control.value === SelectEnum.COULEUR) {
      return { invalideCouleurSelection: true };
    }
    return null;
  }

  public validateTransmissionSelection(control: { value: string; }) {
    if (control.value === SelectEnum.TRANSMISSION) {
      return { invalideTransmissionSelection: true };
    }
    return null;
  }

  public validateEnergieSelection(control: { value: string; }) {
    if (control.value === SelectEnum.ENERGIE) {
      return { invalideEnergieSelection: true };
    }
    return null;
  }

  public validateEtatSelection(control: { value: string; }) {
    if (control.value === SelectEnum.ETAT) {
      return { invalideEtatSelection: true };
    }
    return null;
  }

  public validateMarqueSelection(control: { value: string; }) {
    if (control.value === SelectEnum.MARQUE) {
      return { invalideMarqueSelection: true };
    }
    return null;
  }

  public validateTypeVehiculeSelection(control: { value: string; }) {
    if (control.value === SelectEnum.TYPE_VEHICULE) {
      return { invalideTypeVehiculeSelection: true };
    }
    return null;
  }

  // ----------------------------------------------------------------------------


}
