import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';



@Injectable()
export class GatewayService {

  constructor(
     public apollo: Apollo,
     private httpLink, HttpLink,
     private keycloakService: KeycloakService
  ) {

    //HTTP end-point
    const http = httpLink.create({ uri: environment.api.gateway.graphql.uri });

    //Add the JWT token in every request
    const auth = setContext((_, { headers }) => {
      // get the authentication token from keycloak
      const token = this.keycloakService.getToken;
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          headers: headers.append('Authorization', `Bearer ${token}`)
        };
      }
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: environment.api.gateway.graphql.ws,
      options: {
        reconnect: true,
        connectionParams: {
          authToken: this.keycloakService.getToken,
        },
      }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      auth.concat(http),
    );


    //Create Apollo client
    this.apollo.create({
      link,
      cache: new InMemoryCache()
    });

  }

}