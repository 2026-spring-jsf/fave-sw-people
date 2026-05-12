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

  public getMagicNumber(callerWantsToSucceed: boolean): Promise<number> {
    return new Promise<number>(
      (resolve, reject) => {

        //
        // Some fancy long running code here...
        //

        // Ultimately resolve to number...
        if (callerWantsToSucceed) {
          resolve(42);
        }
        // Or reject with error...
        else {
          reject("Error");
        }
      }
    );
  };
}
