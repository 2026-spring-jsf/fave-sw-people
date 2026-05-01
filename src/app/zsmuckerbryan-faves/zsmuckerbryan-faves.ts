import { Component, inject } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-zsmuckerbryan-faves',
  imports: [AsyncPipe],
  templateUrl: './zsmuckerbryan-faves.html',
  styleUrl: './zsmuckerbryan-faves.css',
})
export class ZsmuckerbryanFaves {
  private swPeopleSvc = inject(SwPeopleService);

  protected readonly people$ = this.swPeopleSvc.getSwPeople();
}
