import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { firstValueFrom } from 'rxjs';

type SwPerson = {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-csnider-faves',
  imports: [],
  templateUrl: './csnider-faves.html',
  styleUrl: './csnider-faves.css',
})
export class CsniderFaves implements OnInit {
  private swPeopleService  = inject(SwPeopleService);

  //protected readonly people$ = this.swPeopleService.getSwPeople();
  
  protected readonly swPeople = signal<SwPerson[]>([]);

  protected readonly selectedCount = computed(
    () => this.swPeople().filter(p => p.checked).length
  ); 

  async ngOnInit() {
    const people = await firstValueFrom(this.swPeopleService.getSwPeople());

    this.swPeople.set(people.map((p: any) => ({
      name: p,
      checked: false,
    })));
  }

  protected toggleChecked(personToToggle: SwPerson) {
    this.swPeople.set(
      this.swPeople().map((p: any) => ({
          ...p,
          checked: p === personToToggle ? !p.checked : p.checked,
      }))
    );
  }

  protected clearSelected() {
    this.swPeople.set(
      this.swPeople().map((p: any) => ({
          ...p,
          checked: false,
      }))
    );
  }

  protected async postToMsTeams() {
    await this.swPeopleService.postFavesToMsTeams(
      {
        name: `Craig's Faves (${this.selectedCount()})`,
        faves: this.swPeople()
          .filter(p => p.checked)
          .map(p => p.name)
          .join(", "),
      }
    );
  }

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
