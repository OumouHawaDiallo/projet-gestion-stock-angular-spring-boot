import { IVehicule } from "./vehicule";

export interface IUtilisateur {
  rowNumber:number;
  utilisateurId: string;
  dateEnregistrement: Date;
  username: string;
  email: string;
  dateNaissance: Date;
  lieuNaissance: string;
  vehicules: IVehicule[];
}
