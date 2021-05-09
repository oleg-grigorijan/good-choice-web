import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectPage} from "./pages/subject/subject.page";
import {HomePage} from "./pages/home/home.page";
import {NotFoundPage} from "./pages/not-found/not-found.page";
import {SubjectTagPage} from "./pages/subject-tag/subject-tag.page";
import {BrandPage} from "./pages/brand/brand.page";

const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'brands/:id', component: BrandPage},
  {path: 'subjects/tags/:id', component: SubjectTagPage},
  {path: 'subjects/:id', component: SubjectPage},
  {path: '**', component: NotFoundPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
