import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector   : 'fuse-nav-vertical-item',
    templateUrl: './nav-vertical-item.component.html',
    styleUrls  : ['./nav-vertical-item.component.scss']
})
export class FuseNavVerticalItemComponent implements OnInit
{
    @HostBinding('class') classes = 'nav-item';
    @Input() item: any;

    constructor(private keycloak: KeycloakService)
    {
    }

    ngOnInit()
    {
    }

    isItemVisible(item): boolean {
      if (item.roles) {
        return item.roles
          .filter(rol => this.keycloak.getUserRoles().indexOf(rol) > -1)
          .length > 0;
      }
      return true;
    }
}
