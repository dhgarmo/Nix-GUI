import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Log } from 'ng2-logger';

import { StatusComponent } from './status/status.component';

import { RpcService } from '../../core/core.module';
import { ModalsService } from '../../modals/modals.module';
/*
 * The MainView is basically:
 * sidebar + router-outlet.
 * Will display the _main_ sidebar (not wallet picker)
 * and display wallet + market views.
 */
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  log: any = Log.create('main-view.component');

  /* UI States */

  title: string = '';

  /* show errors */
  walletInitialized: boolean = undefined;
  daemonRunning: boolean = undefined;

  constructor(
  	private _router: Router,
    private _route: ActivatedRoute,
    private _rpc: RpcService,
    private _modals: ModalsService
  ) { }

  ngOnInit() {
  	// Change the header title derived from route data
    // Source: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
    this._router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this._route)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .flatMap(route => route.data)
      .subscribe(data => this.title = data['title']);


    // Updates the error box in the sidenav whenever a stateCall returns an error.
    this._rpc.errorsStateCall.asObservable()
    .subscribe(status => this.daemonRunning = true,
               error => this.daemonRunning = ![0, 502].includes(error.status));

    // Updates the error box in the sidenav if wallet is not initialized.
    this._rpc.state.observe('ui:walletInitialized')
    .subscribe(status => this.walletInitialized = status);
  }

  /** Open createwallet modal when clicking on error in sidenav */
  createWallet() {
    this._modals.open('createWallet', {forceOpen: true});
  }

}
