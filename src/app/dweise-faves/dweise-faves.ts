import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { firstValueFrom } from 'rxjs';

type SwPerson = {
  name: string;
  checked: boolean;

};

@Component({
  selector: 'app-dweise-faves',
  imports: [],
  templateUrl: './dweise-faves.html',
  styleUrl: './dweise-faves.css',
})

export class DweiseFaves implements OnInit {
  private swPeopleSvc = inject(SwPeopleService);

  // protected readonly people$ = this.swPeopleSvc.getSwPeople();

  protected readonly swPeople = signal<SwPerson[]>([]);

  protected readonly selectedCount = computed(
    () => this.swPeople().filter(
      x => x.checked
    ).length
  )
  async ngOnInit() {
    const people = await firstValueFrom(this.swPeopleSvc.getSwPeople());

    this.swPeople.set(people.map((x: any) => ({name: x, checked: false})));
  }

  protected toggleChecked(persontoToggle: SwPerson) {

    this.swPeople.set(
      this.swPeople().map(
        x => ({
          ...x,
          checked: x === persontoToggle
            ? !x.checked: x.checked,
        })
      )
    );
  }

  protected clearSelected() {

    this.swPeople.set(
      this.swPeople().map(
        x => ({
          ...x,
          checked: false,
        })
      )
    );
  }

  protected async postToMsTeams() {
    await this.swPeopleSvc.postFavesToMsTeams(
      {
        name: `Drew's Faves (${this.selectedCount()})`,
        faves: this.swPeople()
          .filter(x => x.checked)
          .map(x => x.name)
          .join(", "),
      }
    );
  }

  protected promisesAsThenables() {
    this.swPeopleSvc.getMagicNumber(true)
      .then(n => {
        console.log(n);
        return this.swPeopleSvc.getMagicNumber(true);
      })
      .then(n2 => {
        console.log(n2);
      })
      .catch(e => {
        console.warn(e);
      });
  }

  protected async promisesWithAsyncAwait() {
    try {
      const numberOne = await this.swPeopleSvc.getMagicNumber(true);
      console.log(numberOne);

      const numberTwo = await this.swPeopleSvc.getMagicNumber(true);
      console.log(numberTwo);
    }
    catch (e) {
      console.warn(e);
    }
  }

  protected async promisesFun() {
    try {
      const numberOne = this.swPeopleSvc.getMagicNumber(true);
      const numberTwo = this.swPeopleSvc.getMagicNumber(true);

      const data = await Promise.all(
        [numberOne, numberTwo]
      );
      
      // const data = await Promise.any(
      //   [numberOne, numberTwo]
      // );

      // const data = await Promise.race(
      //   [numberOne, numberTwo]
      // );

      console.log(data);
    } 
    catch {

    }
  }
}
