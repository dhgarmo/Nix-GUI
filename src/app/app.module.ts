import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';


import { CoreModule } from './core/core.module';
import { MaterialModule } from './core-ui/material/material.module';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'overview', component: AppComponent, data: { title: 'Overview' } }
  /*{ path: 'overview', component: OverviewComponent, data: { title: 'Overview' } },
  { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
  { path: '**', redirectTo: 'overview', pathMatch: 'full' } // Catch all route */
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CoreModule.forRoot(),
    MaterialModule
  ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
  constructor() {
  }
}
