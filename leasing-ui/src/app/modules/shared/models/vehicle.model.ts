
export class VehicleData {
  public brand = '';
  public model = '';
  public modelYear = '';
  public vin = '';
  public price = 0.0;
}

export class VehicleDataWithId extends VehicleData {
  public id = 0;
}
