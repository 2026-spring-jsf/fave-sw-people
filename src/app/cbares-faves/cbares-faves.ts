import { Component, inject } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cbares-faves',
  imports: [AsyncPipe],
  templateUrl: './cbares-faves.html',
  styleUrl: './cbares-faves.css',
})

export class CbaresFaves {
  private swPeopleSvc = inject(SwPeopleService);

  protected readonly people$ = this.swPeopleSvc.getSwPeople();

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
