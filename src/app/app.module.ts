import { RoleGuard } from './shared/guards/role-guard/role.guard';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/** Modules */
import { KiosqueModule } from './modules/kiosque/kiosque.module';
import { LoginModule } from './login/login.module';
import { FacturationModule } from './modules/facturation/facturation.module';

/** Angular  Material */
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

/** Components */
import { AsideNavComponent } from './shared/components/aside-nav/aside-nav.component';
import { TopNavComponent } from './shared/components/top-nav/top-nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './shared/components/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationGuard } from './shared/guards/auth-guard/authentication.guard';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    AsideNavComponent,
    TopNavComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    KiosqueModule,
    FacturationModule,
    DataTablesModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,

    /** supprimer */
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    CookieService, 
    AuthGuard,
    AuthenticationGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
