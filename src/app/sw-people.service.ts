import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, tap } from 'rxjs';

export type MsTeamsPostDataShape = {
  name: string;
  faves: string;
};

@Injectable({
  providedIn: 'root',
})
export class SwPeopleService {
  private builtInAngularHttpClientService = inject(HttpClient);

  public getSwPeople() {
    const fromApi = this.builtInAngularHttpClientService
      .get<any>('https://swapi.info/api/people')
      .pipe(
        tap((x) => console.log(x)),
        map((x: any) => x.map((y: any) => y.name)),
        tap((x) => console.log(x)),
        map((x: any) => x.sort((a: any, b: any) => a.localeCompare(b))),
        tap((x) => console.log(x)),
      );
    // fromApi.subscribe(
    //   (results) => console.log(results)
    // );

    return fromApi;
  }

  public postFavesToMsTeams(postData: MsTeamsPostDataShape) {
    const teamsWebhookUrl =
      'https://default33f001466fcc49e9b5687896b3069d.44.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/49bcbafbcb5a4098906af3d90089e2e2/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-bhnQEdvTmkARlVjn4Yt8OEZhmnwxTR6kaXl9TZWG7I';
    return firstValueFrom(this.builtInAngularHttpClientService.post(teamsWebhookUrl, postData));
  }

  public getMagicNumber(callerWantsToSucceed: boolean): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      //
      // Some fancy long running code here...
      //

      // Ultimately resolve to number...
      if (callerWantsToSucceed) {
        resolve(42);
      }
      // Or reject with error...
      else {
        reject('Error');
      }
    });
  }
}
