import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { keycloakInitializer } from './auth/keycloakInitializer';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { AppAuthGuard } from './auth/appAuthGuard.service';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { GatewayService } from './api/gateway.service';
import { apolloInitializer } from './api/apolloInitializer';

/* do not edit the line below: autogenerated code */
const appRoutes: Routes = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    TranslateModule.forRoot(),
    FuseMainModule,
    KeycloakAngularModule,
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [
    FuseSplashScreenService,
    FuseConfigService,
    FuseNavigationService,
    AppAuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakInitializer,
      multi: true,
      deps: [KeycloakService]
    },
    GatewayService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
