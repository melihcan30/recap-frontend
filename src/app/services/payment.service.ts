import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl= environment.apiUrl
  constructor(private httpClient:HttpClient) { }

 
  creditPayment(rental:Rental,amount:number):Observable<ResponseModel>
  {
    let newPath=this.apiUrl+"/rentals/paymentadd";
   // rental.returnDate= undefined;
    return this.httpClient.post<ResponseModel>(newPath,{payment:{amount:amount},rental:rental})
  }

  getrentaldetailbycarId(rental:Rental):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "/rentals/getrentaldetailbycarId?carId="+rental;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/cards/add",rental)
  }
}