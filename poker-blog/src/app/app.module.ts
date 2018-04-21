import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { BlogService } from './blog.service';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfilComponent } from './profil/profil.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { RestfulComponent } from './restful/restful.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './blog/delete-blog/delete-blog.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'edit-blog/:id', component: EditBlogComponent, canActivate: [AuthGuard] },
  { path: 'delete-blog/:id', component: DeleteBlogComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'knowledge', component: KnowledgeComponent, canActivate: [AuthGuard] },
  { path: 'restful', component: RestfulComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
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
    ContactComponent,
    BlogComponent,
    EditBlogComponent,
    DeleteBlogComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService, BlogService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
