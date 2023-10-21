
export interface IVehicule {
  rowNumber:number;
  vehiculeId: string;
  dateEnregistrement: Date;
  numeroChassis: number;
  numeroMatricule: number;
  modele: string;
  marque: string;
  couleur: string;
  transmission: string;
  dateFabrication: Date;
  dateCommande: Date;
  dateLivraison: Date;
  energie: string;
  etat: string;
  typeVehicule: string;
}
