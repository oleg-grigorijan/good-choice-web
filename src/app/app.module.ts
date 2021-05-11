import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SubjectSearchResultItemComponent} from "./components/subject-search-result-item/subject-search-result-item.component";
import {SubjectTagSearchResultItemComponent} from './components/subject-tag-search-result-item/subject-tag-search-result-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SearchResultComponent} from './components/search-result/search-result.component';
import {BrandSearchResultItemComponent} from './components/brand-search-result-item/brand-search-result-item.component';
import {SubjectPage} from './pages/subject/subject.page';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {HomePage} from './pages/home/home.page';
import {NotFoundPage} from './pages/not-found/not-found.page';
import {SubjectTagPage} from './pages/subject-tag/subject-tag.page';
import {BrandPage} from './pages/brand/brand.page';
import {ReviewCardComponent} from './components/review-card/review-card.component';
import {SignInFormComponent} from './components/sign-in-form/sign-in-form.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ReviewCreationFormComponent } from './components/review-creation-form/review-creation-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectSearchResultItemComponent,
    SubjectTagSearchResultItemComponent,
    BrandSearchResultItemComponent,
    SearchResultComponent,
    SubjectPage,
    SearchBarComponent,
    HomePage,
    NotFoundPage,
    SubjectTagPage,
    BrandPage,
    ReviewCardComponent,
    SignInFormComponent,
    WelcomeComponent,
    ToolbarComponent,
    ReviewCreationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
