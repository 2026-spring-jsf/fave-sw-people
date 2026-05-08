import { Routes } from '@angular/router';
import { ZsmuckerbryanFaves } from './zsmuckerbryan-faves/zsmuckerbryan-faves';

import { CbaresFaves } from './cbares-faves/cbares-faves';
import { CsniderFaves } from './csnider-faves/csnider-faves';
import { DweiseFaves } from './dweise-faves/dweise-faves';
import { LmeierFaves } from './lmeier-faves/lmeier-faves';
import { MrooneyFaves } from './mrooney-faves/mrooney-faves';
import { ThamiltonFaves } from './thamilton-faves/thamilton-faves';
import { TsteeleFaves } from './tsteele-faves/tsteele-faves';
import { SkhangFaves } from './skhang-faves/skhang-faves';

export const routes: Routes = [
  {
    path: 'cbares',
    component: CbaresFaves,
  },
  {
    path: 'csnider',
    component: CsniderFaves,
  },
  {
    path: 'dweise',
    component: DweiseFaves,
  },
  {
    path: 'lmeier',
    component: LmeierFaves,
  },
  {
    path: 'mrooney',
    component: MrooneyFaves,
  },
  {
    path: 'thamilton',
    component: ThamiltonFaves,
  },
  {
    path: 'tsteele',
    component: TsteeleFaves,
  },
  {
    path: 'zsmuckerbryan',
    component: ZsmuckerbryanFaves,
  },
  {
    path: 'skhang',
    component: SkhangFaves,
  },
];
