import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SubjectSearchResultItemComponent} from "./components/subject-search-result-item/subject-search-result-item.component";
import {SubjectTagSearchResultItemComponent} from './components/subject-tag-search-result-item/subject-tag-search-result-item.component';
import {HttpClientModule} from "@angular/common/http";
import {SearchResultComponent} from './components/search-result/search-result.component';
import {BrandSearchResultItemComponent} from './components/brand-search-result-item/brand-search-result-item.component';
import { SubjectPage } from './pages/subject/subject.page';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomePage } from './pages/home/home.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { SubjectTagPage } from './pages/subject-tag/subject-tag.page';
import { BrandPage } from './pages/brand/brand.page';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
