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
}