import { Routes } from '@angular/router';
import { TsteeleFaves } from './tsteele-faves/tsteele-faves';
import { CbaresFaves } from './cbares-faves/cbares-faves';
import { DweiseFaves } from './dweise-faves/dweise-faves';
import { ThamiltonFaves } from './thamilton-faves/thamilton-faves';
import { LmeierFaves } from './lmeier-faves/lmeier-faves';
import { MrooneyFaves } from './mrooney-faves/mrooney-faves';

export const routes: Routes = [
    {
        path: "tsteele",
        component: TsteeleFaves,
    },
    {
        path: "cbares",
        component: CbaresFaves,
    },
    {
        path: "dweise",
        component: DweiseFaves,
    },
    {
        path: 'thamilton',
        component: ThamiltonFaves,
  },
  {
        path: 'lmeier',
        component: LmeierFaves,
  },
  {
        path: 'mrooney',
        component: MrooneyFaves,
  },
];
