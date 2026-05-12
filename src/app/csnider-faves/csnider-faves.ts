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

  protected async promisesFun() {
  try  {
    const numberOne = this.swPeopleService.getMagicNumber(true);
    const numberTwo = this.swPeopleService.getMagicNumber(false);
    //const data = await Promise.all([numberOne, numberTwo]);
    const data = await Promise.any([numberOne, numberTwo]);
    //onst data = await Promise.race([numberOne, numberTwo]);
    console.log(data);
  } catch (e) {
    console.warn(e);
  }
  }
}
