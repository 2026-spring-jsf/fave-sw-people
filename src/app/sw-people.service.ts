import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwPeopleService {
  private http = inject(HttpClient);

  public getSwPeople() {
    const fromApi = this.http.get<any>('https://swapi.info/api/people');
    //This was mostly for the purpose of ensuring we got the desired data
    //fromApi.subscribe((results) => console.log(results));
    return fromApi.pipe(
      tap((x) => console.log(x)),
      map((x) => x.map((y: any) => y.name)),
      tap((x) => console.log(x)),
      map((x) => x.sort((a: string, b: string) => a.localeCompare(b))),
      tap((x) => console.log(x)),
    );
  }
}
