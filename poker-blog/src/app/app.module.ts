import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfilComponent } from './Profil/Profil.component';
import { KnowledgeComponent } from './Knowledge/Knowledge.component';
import { RestfulComponent } from './restful/restful.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'profil', component: ProfilComponent },
  { path: 'knowledge', component: KnowledgeComponent },
  { path: 'restful', component: RestfulComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomepageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    HomepageComponent,
    ProfilComponent,
    KnowledgeComponent,
    RestfulComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
