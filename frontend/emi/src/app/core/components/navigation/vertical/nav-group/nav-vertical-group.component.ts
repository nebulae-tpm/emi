import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector   : 'fuse-nav-vertical-group',
    templateUrl: './nav-vertical-group.component.html',
    styleUrls  : ['./nav-vertical-group.component.scss']
})
export class FuseNavVerticalGroupComponent implements OnInit
{
    @HostBinding('class') classes = 'nav-group nav-item';
    @Input() item: any;

    constructor(private keycloak: KeycloakService)
    {
    }

    ngOnInit()
    {
    }

    isGroupVisible(item): boolean {
      return (
        item.children.filter(
          children =>
            this.isItemVisible(children) &&
            (!children.children ? true : this.isGroupVisible(children))
        ).length > 0
      );
    }

    isItemVisible(item): boolean {
      if (item.roles) {
        return (
          item.roles.filter(rol => this.keycloak.getUserRoles().indexOf(rol) > -1)
            .length > 0
        );
      }
      return true;
    }

}
