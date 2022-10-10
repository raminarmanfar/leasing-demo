import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerMinimalData, CustomerWithContracts} from '../../shared/models/customer.model';
import {RequestStatus} from '../../shared/models/request-status';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  private readonly CUSTOMERS_URL = '/leasing/customers';

  constructor(private httpClient: HttpClient) {
  }

  public getAllCustomers(): Observable<CustomerWithContracts[]> {
    return this.httpClient.get<CustomerWithContracts[]>(this.CUSTOMERS_URL);
  }

  public getCustomerById(customerId: number): Observable<CustomerWithContracts> {
    return this.httpClient.get<CustomerWithContracts>(this.CUSTOMERS_URL + `/${customerId}`);
  }

  public addNewCustomer(customerData: CustomerMinimalData): Observable<CustomerWithContracts[]> {
    return this.httpClient.post<CustomerWithContracts[]>(this.CUSTOMERS_URL, customerData);
  }

  updateCustomer(customerId: number, customerData: CustomerMinimalData): Observable<CustomerWithContracts[]> {
    return this.httpClient.put<CustomerWithContracts[]>(this.CUSTOMERS_URL + `/${customerId}`, customerData);
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.httpClient.delete<any>(this.CUSTOMERS_URL + `/${customerId}`);
  }

  isCustomerDeletable(customerId: number): Observable<RequestStatus> {
    return this.httpClient.get<RequestStatus>(this.CUSTOMERS_URL + `/deletable/${customerId}`);
  }
}
