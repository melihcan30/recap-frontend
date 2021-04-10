import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class brandService {

  apiUrl = environment.apiUrl
  constructor(private httpClient:HttpClient) { }


  getCars():Observable<ListResponseModel<Brand>>{
   return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
    
  }
}