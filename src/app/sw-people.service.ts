import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwPeopleService {
  private httpService = inject(HttpClient);

  public getSwPeople() {
    const fromApi = this.httpService.get<any>(
      "https://swapi.info/api/people"
    )

    return fromApi.pipe(
      map(x => x.map((y: any) => y.name)),
      map(x => x.sort((a: string, b: string) => a.localeCompare(b))),
    );
  }
}
