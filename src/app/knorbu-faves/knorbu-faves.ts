import { Component, inject } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-knorbu-faves',
  imports: [AsyncPipe],
  templateUrl: './knorbu-faves.html',
  styleUrl: './knorbu-faves.css',
})
export class KnorbuFaves {
  private swPeopleSvc = inject(SwPeopleService)

  protected readonly people$ = this.swPeopleSvc.getSwPeople();

  protected promisesAsThenables() {
    const numberPromise = this.swPeopleSvc.getMagicNumber(true)
      .then(
        n => {
          console.log(n);

            this.swPeopleSvc.getMagicNumber(false)
              .then(
                n2 => console.log(n2)
              )
              .catch (
                e => console.warn(e)
              )
            ;
          }
        )
    .catch(
      e => console.warn(e)
    )
    ;
  }

  protected async promisesWithAsyncAwait() {
    try {

      const numberOne = await this.swPeopleSvc.getMagicNumber(true);
      console.log(numberOne); // ? ? ?
    
      const numberTwo = await this.swPeopleSvc.getMagicNumber(true);
      console.log(numberTwo)

      // const data = await Promise.all(
      //   [numberOne, numberTwo]
      // );
    
      const data = await Promise.any(
        [numberOne, numberTwo]
      );

      // const data = await Promise.race(
      //   [numberOne, numberTwo]
      // );

      console.log(data);
    
    }

    catch (e) {
      console.warn(e);
    }
  }
}