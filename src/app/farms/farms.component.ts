import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Farm, Farm2 } from '../farm';
import { Server } from '../server';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.scss']
})

export class FarmsComponent implements OnInit {

  public farms2: Farm2[];

  constructor(private http: HttpClient) {
    this.fetchData().subscribe(then =>  
      {
        this.farms2 = then
      }
    );
  }

  fetchData(): Observable<Farm2[]> {
    return this.http.get<Farm2[]>('/assets/data.json')
        .pipe(
          catchError(this.handleError<Farm2[]>('Farm2'))
        )
  }

  deleteServer(farm: Farm2, server: Server) {
    let farma = this.farms2.filter(f => f == farm)[0];
    farma.servers = farm.servers.filter(s => s != server);    
  }

  deleteFarm(farm: Farm2) {
    this.farms2 = this.farms2.filter(f => f != farm);
  }

  serverCount(): number {
    let serversTotal = 0;
    
    this.farms2.forEach(farm => {
      serversTotal += farm.servers.length;
    })

    return serversTotal;
  }

  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
          // Let the app keep running by returning an empty result.
          return of(result as T);
      };
  }
  
  ngOnInit() {

  }



}
