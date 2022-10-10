import {CarBrandModel} from './models/car-brand-model';

export class ConstantValues {
  public static readonly carBrands: CarBrandModel[] = [
    {brand: 'Audi', models: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'A1', 'A2', 'A3', 'E-trun']},
    {brand: 'BMW', models: ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'i3', 'i4', 'i7', 'iX']},
    {brand: 'Fiat', models: ['500', 'Tipo', 'Panda', '500C', '124 Spider', 'Argo']},
    {brand: 'Ford', models: ['Focus', 'Fiesta', 'Mustang', 'Puma', 'Galaxy', 'F-150', 'Escape', 'Edge']},
    {brand: 'Hyundai', models: ['Tucson', 'Santa Fe', 'Kona', 'i10', 'i20', 'A1', 'IONIQ', 'Bayon']},
    {brand: 'Mercedes-Benz', models: ['A Class', 'C Class', 'G Class', 'E Class', 'GLE', 'EQS', 'CLS']},
    {brand: 'Tesla', models: ['Model 3', 'Model S', 'Model Y', 'Model X']},
    {brand: 'Toyota', models: ['Corolla', 'Yaris', 'Land Cruiser', 'RAV4', 'Prius', 'Mirai', 'Aygo X']},
    {brand: 'Volkswagen (VW)', models: ['Tiguan', 'Touareg', 'Golf', 'Polo', 'Passat', 'T-Roc', 'Taigo', 'Caddy', 'ID.3', 'ID.5', 'Allspace']},
    {brand: 'Volvo', models: ['XC40', 'XC60', 'XC90', 'V60', 'V90', 'S90', 'C40', 'C60', 'S60']},
  ];
}
