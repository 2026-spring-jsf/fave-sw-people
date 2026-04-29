import { Component, inject } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dweise-faves',
  imports: [AsyncPipe],
  templateUrl: './dweise-faves.html',
  styleUrl: './dweise-faves.css',
})

export class DweiseFaves {
  private swPeopleSvc = inject(SwPeopleService);

  protected readonly people$ = this.swPeopleSvc.getSwPeople();

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
}
