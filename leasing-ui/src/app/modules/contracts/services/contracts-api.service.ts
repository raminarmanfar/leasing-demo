import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {ContractDetailWithIds} from '../../shared/models/contract-detail-with-ids';
import {ContractEssentialData} from '../../shared/models/contract-essential-data';
import {CommonService} from '../../shared/common.service';
import {ErrorDetail} from '../../shared/models/error-detail';

@Injectable({
  providedIn: 'root'
})
export class ContractsApiService {
  private readonly CUSTOMERS_URL = '/leasing/contracts';
  private errorDetail: ErrorDetail = {errorCode: -1, message: ''};

  constructor(private commonService: CommonService,
              private httpClient: HttpClient) {
  }

  private setError(errorDetail: ErrorDetail): void {
    this.errorDetail = errorDetail;
  }

  private handleError(error: HttpErrorResponse) {
    this.setError({errorCode: error.status, message: error.message});
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body: `, error.error);
    }
    return of([]);
    // return throwError(() => new Error(`Error Code: ${error.status}, error: ${error.error}`));
  }

  public resetErrorDetail(): void {
    this.setError({errorCode: -1, message: ''});
  }

  public getErrorDetail(): ErrorDetail | null {
    return this.errorDetail.errorCode > -1 ? this.errorDetail : null;
  }

  public getAllContracts(): Observable<any> {
    this.setError({errorCode: -1, message: ''});
    return this.httpClient.get<any>(this.CUSTOMERS_URL, {observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  public getAllContractsWithDetails(): Observable<ContractDetailWithIds[]> {
    return this.httpClient.get<ContractDetailWithIds[]>(this.CUSTOMERS_URL + '/contracts-details');
  }

  public addNewContract(contractData: ContractDetailWithIds): Observable<ContractDetailWithIds[]> {
    const customerId = contractData.customerId;
    const vehicleId = contractData.vehicleId;
    const contractDataToAdd: ContractEssentialData = {
      contractNumber: contractData.contractNumber,
      monthlyRate: contractData.monthlyRate
    };
    return this.httpClient.post<ContractDetailWithIds[]>(this.CUSTOMERS_URL + `/${customerId}/${vehicleId}`, contractDataToAdd);
  }

  public updateContract(contractId: number, updatedContractData: ContractDetailWithIds): Observable<ContractDetailWithIds[]> {
    const customerId = updatedContractData.customerId;
    const vehicleId = updatedContractData.vehicleId;
    const contractDataToUpdate: ContractEssentialData = {
      contractNumber: updatedContractData.contractNumber,
      monthlyRate: updatedContractData.monthlyRate
    };

    this.setError({errorCode: -1, message: ''});
    return this.httpClient
      .put<ContractDetailWithIds[]>(this.CUSTOMERS_URL + `/${contractId}/${customerId}/${vehicleId}`, contractDataToUpdate)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.setError({errorCode: error.status, message: error.error});
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          console.error(`Backend returned code ${error.status}, body: `, error.error);
        }
        return of([]);
      }));
  }

  public deleteContract(contractId: number): Observable<any> {
    return this.httpClient.delete<any>(this.CUSTOMERS_URL + `/${contractId}`);
  }
}
