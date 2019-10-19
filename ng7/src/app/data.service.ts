import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPatients(): Observable<any>  {
    return this.http.get('http://localhost:8080/api/patients');
    // return this.http.get('https://reqres.in/api/users');
  }

  addPatient(patient: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/addPatient', patient);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/api/deletepPatient?id='.concat(id.toString()));
  }

  updatePatient(patient: any): Observable<any> {
    return this.http.put('http://localhost:8080/api/updatePatient', patient);
  }

}
