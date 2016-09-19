import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupMainComponent } from './signup-main/signup-main.component';

const appRoutes: Routes = [
	{ path: 'signup', component: SignupMainComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);