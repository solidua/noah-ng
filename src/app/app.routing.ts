import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibleMainComponent }   from './bible-main/bible-main.component';
import { SignupMainComponent } from './signup-main/signup-main.component';
import { SigninMainComponent } from './signin-main/signin-main.component';
import { VerseMainComponent } from './verse-main/verse-main.component'; 


const appRoutes: Routes = [
  { path: '', component: BibleMainComponent}, 
  { path: 'verses/:id', component: VerseMainComponent},
	{ path: 'signup', component: SignupMainComponent },
	{ path: 'signin', component: SigninMainComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);