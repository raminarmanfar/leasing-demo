export class CustomerWithFullName {
  public id = 0;
  public name = '';
  public birthdate = '';
}

export class CustomerMinimalData {
  public firstname = '';
  public lastname = '';
  public birthdate = '';
}

export class CustomerWithContracts extends CustomerMinimalData {
  public id = 0;
  public contracts: any[] = [];
}
