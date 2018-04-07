import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../../environments/environment';

@Injectable()
export class GatewayService {

  constructor(
    private apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: environment.api.gateway.graphql.uri }),
      cache: new InMemoryCache()
    });
  }
}