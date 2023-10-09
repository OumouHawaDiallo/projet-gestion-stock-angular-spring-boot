import { IVehicule } from "./vehicule";

export interface IUtilisateur {

  id: number;
  username: string;
  email: string;
  dateNaissance: Date;
  lieuNaissance: string;
  vehicules: IVehicule[];
}
