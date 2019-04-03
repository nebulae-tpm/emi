import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FuseConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs/Subscription';
import { locale as english } from '../../../main/i18n/en';
import { locale as spanish } from '../../../main/i18n/es';
import { FuseTranslationLoaderService } from '../../services/translation-loader.service';

@Component({
  selector: 'fuse-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class FuseSearchBarComponent implements OnInit {
  collapsed: boolean;
  toolbarColor: string;
  @Output() onInput: EventEmitter<any> = new EventEmitter();
  onSettingsChanged: Subscription;

  constructor(
    private fuseConfig: FuseConfigService,
    private translationLoader: FuseTranslationLoaderService
  ) {
    this.translationLoader.loadTranslations(english, spanish);
    this.collapsed = true;
    this.onSettingsChanged = this.fuseConfig.onSettingsChanged.subscribe(
      newSettings => {
        this.toolbarColor = newSettings.colorClasses.toolbar;
      }
    );
  }

  ngOnInit() {}

  collapse() {
    this.collapsed = true;
  }

  expand() {
    this.collapsed = false;
  }

  search(event) {
    const value = event.target.value;

    this.onInput.emit(value);
  }
}
