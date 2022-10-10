import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VehicleData, VehicleDataWithId} from '../../shared/models/vehicle.model';
import {RequestStatus} from '../../shared/models/request-status';

@Injectable({
  providedIn: 'root'
})
export class VehicleApiService {
  private readonly VEHICLES_URL = '/leasing/vehicles';

  constructor(private httpClient: HttpClient) {
  }

  public getAllVehicles(): Observable<VehicleDataWithId[]> {
    return this.httpClient.get<VehicleDataWithId[]>(this.VEHICLES_URL);
  }

  public getAllVehiclesNotInContract(): Observable<VehicleDataWithId[]> {
    return this.httpClient.get<VehicleDataWithId[]>(this.VEHICLES_URL + '/not-in-contract');
  }

  public getVehicleById(vehicleId: number): Observable<VehicleDataWithId> {
    return this.httpClient.get<VehicleDataWithId>(this.VEHICLES_URL + `/${vehicleId}`);
  }

  public addNewVehicle(vehicleData: VehicleData): Observable<VehicleDataWithId[]> {
    return this.httpClient.post<VehicleDataWithId[]>(this.VEHICLES_URL, vehicleData);
  }

  updateVehicle(vehicleId: number, vehicleData: VehicleData): Observable<VehicleDataWithId[]> {
    return this.httpClient.put<VehicleDataWithId[]>(this.VEHICLES_URL + `/${vehicleId}`, vehicleData);
  }

  deleteVehicle(vehicleId: number): Observable<any> {
    return this.httpClient.delete<any>(this.VEHICLES_URL + `/${vehicleId}`);
  }

  isVehicleDeletable(vehicleId: number): Observable<RequestStatus> {
    return this.httpClient.get<RequestStatus>(this.VEHICLES_URL + `/deletable/${vehicleId}`);
  }
}
