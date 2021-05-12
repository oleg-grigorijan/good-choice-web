import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SubjectSearchResultItemComponent} from "./components/subject-search-result-item/subject-search-result-item.component";
import {SubjectTagSearchResultItemComponent} from './components/subject-tag-search-result-item/subject-tag-search-result-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrandSearchResultItemComponent} from './components/brand-search-result-item/brand-search-result-item.component';
import {SubjectPage} from './pages/subject/subject.page';
import {HomePage} from './pages/home/home.page';
import {NotFoundPage} from './pages/not-found/not-found.page';
import {SubjectTagPage} from './pages/subject-tag/subject-tag.page';
import {BrandPage} from './pages/brand/brand.page';
import {ReviewCardComponent} from './components/review-card/review-card.component';
import {SignInFormComponent} from './components/sign-in-form/sign-in-form.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {ReviewCreationFormComponent} from './components/review-creation-form/review-creation-form.component';
import {SubjectCreationFormComponent} from './components/subject-creation-form/subject-creation-form.component';
import {BrandCreationFormComponent} from './components/brand-creation-form/brand-creation-form.component';
import {ImageViewerComponent} from './components/image-viewer/image-viewer.component';
import {AuthInterceptor} from "./services/auth.interceptor";
import {SignUpFormComponent} from './components/sign-up-form/sign-up-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectSearchResultItemComponent,
    SubjectTagSearchResultItemComponent,
    BrandSearchResultItemComponent,
    SubjectPage,
    HomePage,
    NotFoundPage,
    SubjectTagPage,
    BrandPage,
    ReviewCardComponent,
    SignInFormComponent,
    WelcomeComponent,
    ToolbarComponent,
    ReviewCreationFormComponent,
    SubjectCreationFormComponent,
    BrandCreationFormComponent,
    ImageViewerComponent,
    SignUpFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
