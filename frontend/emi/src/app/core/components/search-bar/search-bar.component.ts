import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild, OnDestroy, Input } from '@angular/core';
import { FuseConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs/Subscription';
import { locale as english } from '../../../main/i18n/en';
import { locale as spanish } from '../../../main/i18n/es';
import { FuseTranslationLoaderService } from '../../services/translation-loader.service';
import { Observable } from 'rxjs/Observable';
import { fromEvent, Subject, of, defer, from, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, filter, map, takeUntil, tap, mapTo, toArray, startWith, delay, catchError } from 'rxjs/operators';
import { SearchBarService } from './search-bar.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'fuse-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class FuseSearchBarComponent implements OnInit, OnDestroy {
  collapsed: boolean;
  toolbarColor: string;
  @Output() onBusinessSelected: EventEmitter<any> = new EventEmitter();
  @Input() selectedBU: any;
  onSettingsChanged: Subscription;

  businessQueryFiltered$: Observable<any>;
  @ViewChild('inputFilter') inputFilter: ElementRef;
  private ngUnsubscribe = new Subject();
  userRoles: string[] = [];
  userDetails = {};

  ALL_BUSINESS_REF = { id: null, name: 'TOOLBAR.ALL_BUSINESS_NAME'};

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
    of(this.keycloakService.getUserRoles(true).includes('PLATFORM-ADMIN'))
      .pipe(
        tap(ispa => console.log('IS PLATFORM ADMIN ==> ', ispa)),
        delay(500),
        mergeMap((isSysAdmin: boolean) => isSysAdmin
          ? of({})
            .pipe(
              delay(50),
              map(() => ({
                data: {
                  myBusiness: {
                    _id: this.ALL_BUSINESS_REF.id,
                    generalInfo: {
                      name: this.translationLoader.getTranslate().instant(this.ALL_BUSINESS_REF.name)
                    }
                  }
                }
              }))
            )
          : this.searchBarService.getUserBusiness$()
            .pipe(
              tap(r => console.log('################ MY BUSINESS IS => ', r) ),
              catchError(error => defer(() => this.keycloakService.loadUserProfile() )
                .pipe(
                  tap(ud => console.log(error, 'USER DETAILS ==> ', ud)),
                  map((userDetails: any) => ({
                      data: {
                        myBusiness: {
                          _id: userDetails['attributes']['businessId'][0],
                          generalInfo: {
                            name: this.translationLoader.getTranslate().instant('TOOLBAR.MY_BUSINESS')
                          }
                        }
                      }
                    }
                  ))
                ))
            )
        ),
        // filter(result => result && !result.erros),
        tap(r => console.log('FOUND BUSINESS =>', r) ),
        map(rawResponse => (rawResponse ? rawResponse.data.myBusiness : null)),
        filter(result => result !== null),
        map(response => ({
          id: response._id,
          name: response.generalInfo.name
        })),
        tap( bu => this.selectedBU = bu),
        map(bu => this.onBusinessSelected.next(bu))
      )
      .subscribe(r => {}, e => console.log(e), () => {});

    this.businessQueryFiltered$ = fromEvent(this.inputFilter.nativeElement, 'keyup')
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        mergeMap(() => this.getBusinessFiltered$(this.inputFilter.nativeElement.value)),
        catchError(error => defer(() => this.keycloakService.loadUserProfile())
          .pipe(
            map((userDetails: any) => ([{
              id: userDetails['attributes']['businessId'] ?  userDetails['attributes']['businessId'][0] : null,
              name: this.translationLoader.getTranslate().instant('TOOLBAR.MY_BUSINESS')
            }]))
          ))
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
    if (this.userRoles.includes('PLATFORM-ADMIN')){
      this.collapsed = false;
    }
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
    return business ? business.name : '';
  }

  getBusinessFiltered$(filterText: string): Observable<any[]> {
    return this.searchBarService
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
        map(response => ([...response, {
          id: this.ALL_BUSINESS_REF.id,
          name: this.translationLoader.getTranslate().instant(this.ALL_BUSINESS_REF.name)
        }])),
        takeUntil(this.ngUnsubscribe)
      );
  }
}
