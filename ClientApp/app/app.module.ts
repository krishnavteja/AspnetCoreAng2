import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';

import { Select2Module } from 'ng2-select2';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { ContactComponent } from './components/contact/contact.component';
import { PlanSearchComponent } from './components/plan/plansearch.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        PlanSearchComponent,
        ContactComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        Select2Module,
        RouterModule.forRoot([
            { path: '', redirectTo: 'plan-search', pathMatch: 'full' },
            { path: 'contact', component: ContactComponent },
            { path: 'plan-search', component: PlanSearchComponent },
            { path: '**', redirectTo: 'plan-search' }
        ])
    ]
})
export class AppModule {
}
