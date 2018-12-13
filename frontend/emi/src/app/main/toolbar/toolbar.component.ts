import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { locale as english } from '../i18n/en';
import { locale as spanish } from '../i18n/es';
import { FuseTranslationLoaderService } from '../../core/services/translation-loader.service';

export interface Language{
  id: string;
  title: string;
  flag: string;
}

@Component({
  selector: 'fuse-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class FuseToolbarComponent {
  userDetails: KeycloakProfile = {};
  userStatusOptions: any[];
  languages: Language[];
  selectedLanguage: Language;
  showLoadingBar: boolean;
  horizontalNav: boolean;
  userRoles: string[] = [];

  constructor(
    private router: Router,
    private fuseConfig: FuseConfigService,
    private translate: TranslateService,
    private keycloakService: KeycloakService,
    private translationLoader: FuseTranslationLoaderService
  ) {
    this.translationLoader.loadTranslations(english, spanish);
    this.userStatusOptions = [
      {
        title: 'Online',
        icon: 'icon-checkbox-marked-circle',
        color: '#4CAF50'
      },
      {
        title: 'Away',
        icon: 'icon-clock',
        color: '#FFC107'
      },
      {
        title: 'Do not Disturb',
        icon: 'icon-minus-circle',
        color: '#F44336'
      },
      {
        title: 'Invisible',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#BDBDBD'
      },
      {
        title: 'Offline',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#616161'
      }
    ];

    this.languages = [
      {
        id: 'es',
        title: 'Español',
        flag: 'es'
      },
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      }
    ];

    const userLang = navigator.language;
    this.selectedLanguage = this.languages[0];

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showLoadingBar = true;
      }
      if (event instanceof NavigationEnd) {
        this.showLoadingBar = false;
      }
    });

    this.fuseConfig.onSettingsChanged.subscribe(settings => {
      this.horizontalNav = settings.layout.navigation === 'top';
    });
    this.translate.use(this.selectedLanguage.id);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  async ngOnInit() {
    this.userDetails = await this.keycloakService.loadUserProfile();
    const userLanguage = this.userDetails['attributes']['locale'] || 'es';
    const language = this.languages.find(lang => lang.id === userLanguage);
    this.setLanguage(language || this.languages[0]);

    this.userRoles = this.keycloakService.getUserRoles(true);
  }

  logout() {
    this.keycloakService.logout();
  }

  search(value) {
    // Do your search here...
    console.log(value);
  }

  setLanguage(lang) {
    // console.log('lang', lang);
    // Set the selected language for toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this.translate.use(lang.id);
  }

  async copyJwt(){
    const element = document.createElement('textarea');
    element.id = 'jwtBody';
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.opacity = '0';
    element.value = await this.keycloakService.getToken();
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(document.getElementById('jwtBody'));
  }
}
