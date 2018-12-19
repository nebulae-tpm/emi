import { Injectable } from "@angular/core";
import { GatewayService } from "../../../api/gateway.service";
import { getMyBusiness, getBusinessList } from "./gql/toolbar.js";

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
      fetchPolicy: "network-only",
      errorPolicy: "all"
    });
  }

  getUserBusiness$() {
    return this.gateway.apollo.query<any>({
      query: getMyBusiness,
      fetchPolicy: "network-only",
      errorPolicy: "all"
    });
  }
}
