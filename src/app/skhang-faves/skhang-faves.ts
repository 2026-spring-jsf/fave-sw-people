import { Component, inject } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-skhang-faves',
  imports: [AsyncPipe],
  templateUrl: './skhang-faves.html',
  styleUrl: './skhang-faves.css',
})
export class SkhangFaves {
  private swPeopleSvc = inject(SwPeopleService);

  protected readonly people$ = this.swPeopleSvc.getSwPeople();

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
}
