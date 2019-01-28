import { Injectable } from '@angular/core';
import { GatewayService } from '../../../api/gateway.service';
import { getMyBusiness, getBusinessList } from './gql/toolbar.js';
import { tap } from 'rxjs/operators';

@Injectable()
export class SearchBarService {
  constructor(private gateway: GatewayService) {}

  getFilteredBusinessList$(filterText: string, limit: number) {
    return this.gateway.apollo.query<any>({
      query: getBusinessList,
      variables: {
        page: 0,
        count: limit,
        filter: filterText
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    });
  }

  getUserBusiness$() {
    // console.log('SEARCHING MY BUSINESS');
    return this.gateway.apollo.query<any>({
      query: getMyBusiness,
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    });
    // .pipe(
    //   tap(r => console.log('RESPONSE => ', r))
    // );
  }
}
