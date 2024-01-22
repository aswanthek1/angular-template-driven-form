import { Routes } from '@angular/router';
import { TemplateFormComponent } from './modules/template-form/template-form.component';
import { ReactiveFormComponent } from './modules/reactive-form/reactive-form.component';

export const routes: Routes = [
    {path:'', component:TemplateFormComponent},
    {path:'reactive-form', component:ReactiveFormComponent}
];
