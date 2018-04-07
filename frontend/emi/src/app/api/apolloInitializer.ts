import { Apollo } from "apollo-angular";
import { HttpLink } from "apollo-angular-link-http";

export function apolloInitializer(apollo: Apollo, httpLink: HttpLink) {
    return () => {
        console.log('Apollo Libs have been initialized');
    };
}