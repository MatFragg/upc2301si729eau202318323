import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { RecordsViewComponent } from './marathon/pages/records-view/records-view.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'marathon/records', component: RecordsViewComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
