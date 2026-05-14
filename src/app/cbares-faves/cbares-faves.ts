import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { firstValueFrom } from 'rxjs';

type SwPerson = {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-cbares-faves',
  imports: [],
  templateUrl: './cbares-faves.html',
  styleUrl: './cbares-faves.css',
})

export class CbaresFaves implements OnInit{

  private swPeopleSvc = inject(SwPeopleService);

  protected readonly selectedCount = computed(
    () => this.swPeople().filter(p => p.checked).length
  );
  // protected readonly people$ = this.swPeopleSvc.getSwPeople();

  async ngOnInit() {
    const people = await firstValueFrom(
      this.swPeopleSvc.getSwPeople()
    );

    this.swPeople.set(
      people.map(
        (x: any) => ({
          name: x,
          checked: false
        })
      )
    )
  }

  protected toggleChecked(personToToggle: SwPerson) {
    this.swPeople.set(
      this.swPeople().map(
        x => ({
          ...x,
          checked: x === personToToggle
            ? !x.checked
            : x.checked,
        })
      )
    )
  }

  protected clearSelected() {
    this.swPeople.set(
      this.swPeople().map(
        x => ({
          ...x,
          checked: false
        })
      )
    )
  }

  protected async postToMsTeams() {
    await this.swPeopleSvc.postFavesToMsTeams(
      {
        name: `Colin's Faves (${this.selectedCount()})`,
        faves: this.swPeople()
          .filter(
            x => x.checked
          )
          .map(
            x => x.name
          )
          .join(', '),
      }
    );
  }
  protected readonly swPeople = signal<SwPerson[]>([]);

  protected promisesAsThenables() {
    const numberPromise = this.swPeopleSvc.getMagicNumber(true).then(
      n => {
        console.log(n);

        this.swPeopleSvc.getMagicNumber(true).then(
          n2 => console.log(n2)
        ).catch(
          e => console.warn(e)
        )
      }
    ).catch(
      e => console.warn(e)
    )
  }

  protected async promisesWithAsyncAwait() {
    try {

      const numberOne = await this.swPeopleSvc.getMagicNumber(true);
      console.log(numberOne);

      const numberTwo = await this.swPeopleSvc.getMagicNumber(false);
      console.log(numberTwo);
    } catch(e) {
      console.warn(e);
    }
  }

    protected async promisesFun() {
    try {

      const numberOne = this.swPeopleSvc.getMagicNumber(false);
      // console.log(numberOne);

      const numberTwo = this.swPeopleSvc.getMagicNumber(true);
      // console.log(numberTwo);

      //returns array with results of all promises, or rejects if any promise rejects
      // const data = await Promise.all(
      //   [numberOne, numberTwo]
      // );

      // returns array with single result of first promise to resolve, or rejects if all promises reject
      const data = await Promise.any(
        [numberOne, numberTwo]
      );

      // if one resolves, cancels others
      // const data = await Promise.race(
      //   [numberOne, numberTwo]
      // )

      console.log(data);
    } catch(e) {
      console.warn(e);
    }
  }
}
