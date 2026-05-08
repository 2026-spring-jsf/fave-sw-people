import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { firstValueFrom } from 'rxjs';

type SwPerson = {
  name: string;
  checked: boolean;
};

@Component({
  selector: 'app-thamilton-faves',
  imports: [],
  templateUrl: './thamilton-faves.html',
  styleUrl: './thamilton-faves.css',
})
export class ThamiltonFaves implements OnInit {
  private swPeopleSvc = inject(SwPeopleService);

  //Naming convention: observables get a '$' at the end
  //hover over a thing to see if it is an observable
  //protected readonly people$ = this.swPeopleSvc.getSwPeople();

  protected readonly swPeople = signal<SwPerson[]>([]);

  protected readonly selectedCount = computed(
    () => this.swPeople().filter((x) => x.checked).length,
  );

  async ngOnInit() {
    const people = await firstValueFrom(this.swPeopleSvc.getSwPeople());

    this.swPeople.set(
      people.map((x: any) => ({
        name: x,
        checked: false,
      })),
    );
  }

  protected toggleChecked(personToToggle: SwPerson) {
    this.swPeople.set(
      this.swPeople().map((x) => ({
        ...x,
        checked: x === personToToggle ? !x.checked : x.checked,
      })),
    );
  }

  protected clearSelected() {
    this.swPeople.set(
      this.swPeople().map((x) => ({
        ...x,
        checked: false,
      })),
    );
  }

  protected async postToMsTeams() {
    await this.swPeopleSvc.postFavesToMsTeams({
      name: `Tim's Faves (${this.selectedCount()})`,
      faves: this.swPeople()
        .filter((x) => x.checked)
        .map((x) => x.name)
        .join(', '),
    });
  }

  protected promisesAsThenables() {
    const numberPromise = this.swPeopleSvc
      .getMagicNumber(true)
      .then((n) => {
        console.log(n);

        this.swPeopleSvc
          .getMagicNumber(true)
          .then((n2) => console.log(n2))
          .catch((e) => console.warn(e));
      })
      .catch((e) => console.warn(e));
  }

  protected async promisesWithAsyncAwait() {
    try {
      const numberOne = await this.swPeopleSvc.getMagicNumber(true);
      console.log(numberOne);
      const numberTwo = await this.swPeopleSvc.getMagicNumber(true);
      console.log(numberTwo);
    } catch (e) {
      console.warn(e);
    }
  }

  protected async promisesFun() {
    try {
      //notice no 'await'
      const numberOne = this.swPeopleSvc.getMagicNumber(false);
      const numberTwo = this.swPeopleSvc.getMagicNumber(true);

      /*
      //this works only if all promises resolve and returns an array of promise values (not promises, but the promise values)
      const data = await Promise.all([numberOne, numberTwo]);
      */

      /*
      //this works only if not all promises are rejected (i.e. as long as at least one promise resolves) and returns only one promise value: the value of the first promise to resolve
      const data = await Promise.any([numberOne, numberTwo]);
      */

      /*
      //this works whether any number of promises resolve or are rejected, and returns only one promise value: the value of the first promise to settle (whether that promise resolved or was rejected)
      const data = await Promise.race([numberOne, numberTwo]);
      */

      //this works whether any number of promises resolve or are rejected, and returns an array of promise objects, each with 2 properties: status ('fulfilled' or 'rejected'), and value (if status is 'fulfilled'), or reason (if status is 'rejected')
      const data = await Promise.allSettled([numberOne, numberTwo]);

      console.log(data);
    } catch (e) {
      console.warn(e);
    }
  }
}
