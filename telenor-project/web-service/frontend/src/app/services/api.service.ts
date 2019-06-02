import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(
		private http: HttpClient,
	) { }

	currentDate() {
		return this.http.get(environment.apiUrl + '/date');
	}
}
