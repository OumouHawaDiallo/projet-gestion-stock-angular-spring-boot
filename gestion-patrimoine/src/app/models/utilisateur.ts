import { IVehicule } from "./vehicule";

export interface IUtilisateur {

  user_id: number;
  username: string;
  email: string;
  date_naissance: Date;
  lieu_naissance: string;
  vehicules: IVehicule[];
}
