import { KeycloakService, KeycloakOnLoad } from 'keycloak-angular';
import { environment } from '../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(environment);
                await keycloak.init({
                    config: {
                        url: environment.keycloak.url,
                        realm: environment.keycloak.realm,
                        clientId: environment.keycloak.clientId
                    },
                    initOptions: {
                        onLoad: environment.keycloak.onLoad as KeycloakOnLoad,
                        checkLoginIframe: environment.keycloak.checkLoginIframe                        
                    },
                    bearerExcludedUrls: environment.keycloak.bearerExcludedUrls
                });
                resolve();
            } catch (error) { 
                console.log(error);
            }
        });
    };
}