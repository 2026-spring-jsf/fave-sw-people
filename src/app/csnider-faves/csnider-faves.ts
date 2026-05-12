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
}
