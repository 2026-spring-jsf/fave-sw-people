import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';


@Component({
  selector: 'app-csnider-faves',
  imports: [AsyncPipe],
  templateUrl: './csnider-faves.html',
  styleUrl: './csnider-faves.css',
})
export class CsniderFaves {
  private swPeopleService  = inject(SwPeopleService);

  protected readonly people$ = this.swPeopleService.getSwPeople();
  
  protected promisesAsThenables() {
    const number = this.swPeopleService.getMagicNumber(true).then(
      n => {
        console.log(n);
        this.swPeopleService.getMagicNumber(true).then(
          n2 => console.log(n2)
        ).catch(e => console.warn(e));
      }
    ).catch(e => console.warn(e));
  };

  protected async promisesWithAsyncAwait() {
    try  {
      const numberOne = await this.swPeopleService.getMagicNumber(true);
      console.log(numberOne);

      const numberTwo = await this.swPeopleService.getMagicNumber(true);
      console.log(numberTwo);
    } catch (e) {
      console.warn(e);
    }
  }
}
