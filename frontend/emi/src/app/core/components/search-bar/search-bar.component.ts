import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FuseConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs/Subscription';
import { locale as english } from '../../../main/i18n/en';
import { locale as spanish } from '../../../main/i18n/es';
import { FuseTranslationLoaderService } from '../../services/translation-loader.service';
import { Observable } from 'rxjs/Observable';
import { fromEvent, Subject, of, defer, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, filter, map, takeUntil, tap, mapTo, toArray, startWith } from 'rxjs/operators';
import { SearchBarService } from './search-bar.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: "fuse-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class FuseSearchBarComponent implements OnInit, OnDestroy {
  collapsed: boolean;
  toolbarColor: string;
  @Output() onBusinessSelected: EventEmitter<any> = new EventEmitter();
  onSettingsChanged: Subscription;

  businessQueryFiltered$: Observable<any>;
  @ViewChild("inputFilter") inputFilter: ElementRef;
  private ngUnsubscribe = new Subject();
  userRoles: string[] = [];
  userDetails = {};

  constructor(
    private fuseConfig: FuseConfigService,
    private translationLoader: FuseTranslationLoaderService,
    private searchBarService: SearchBarService,
    private keycloakService: KeycloakService
  ) {
    this.translationLoader.loadTranslations(english, spanish);
    this.collapsed = true;
    this.onSettingsChanged = this.fuseConfig.onSettingsChanged.subscribe(
      newSettings => {
        this.toolbarColor = newSettings.colorClasses.toolbar;
      }
    );
  }

  ngOnInit() {
    this.userRoles = this.keycloakService.getUserRoles(true);

    of(this.keycloakService.getUserRoles(true).includes("PLATFORM-ADMIN"))
      .pipe(
        mergeMap((isSysAdmin: boolean) =>
          isSysAdmin ? of(null) : this.searchBarService.getUserBusiness$()
        ),
        filter(result => result && !result.erros),
        map(rawResponse => (rawResponse ? rawResponse.data.myBusiness : null)),
        filter(result => result !== null),
        map(response => ({
          id: response._id,
          name: response.generalInfo.name
        })),
        map(bu => this.onBusinessSelected.next(bu))
      )
      .subscribe(r => {}, e => console.log(e), () => {});

    this.businessQueryFiltered$ = fromEvent(this.inputFilter.nativeElement, 'keyup')
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        mergeMap(() => this.getBusinessFiltered$(this.inputFilter.nativeElement.value))
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  collapse() {
    this.collapsed = true;
  }

  expand() {
    this.collapsed = false;
  }

  // search(event) {
  //   const value = event.target.value;
  //   this.onInput.emit(value);
  // }

  onSelectBusinessEvent(business) {
    this.onBusinessSelected.emit(business);
    this.collapse();
  }

  displayFn(business) {
    return business ? business.name : "";
  }

  getBusinessFiltered$(filterText: string): Observable<any[]> {
    return (
      this.searchBarService
        .getFilteredBusinessList$(filterText, 10)
        .pipe(
          filter((resp: any) => !resp.errors),
          map(result => result.data.getBusinesses),
          mergeMap(results =>
            from(results).pipe(
              map((bu: any) => ({ id: bu._id, name: bu.generalInfo.name })),
              toArray()
            )
          ),
          takeUntil(this.ngUnsubscribe)
        )
    );
  }
}
