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
}
