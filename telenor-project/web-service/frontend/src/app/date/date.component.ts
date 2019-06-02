import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  private date: any;

  constructor(
  	private apiService: ApiService
  ) {

  	this.date = {
  		text: {
  			date: 'Current Date:',
	  		year: 'Year:',
	  		month: 'Month:',
	  		day: 'Day:',
  		},
  		value: {},
  	};
  }

  ngOnInit() {
  	this.apiService
		.currentDate()
		.subscribe(data => {
			this.date.value = data;
		});
  }
}
