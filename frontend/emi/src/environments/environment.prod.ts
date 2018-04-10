export const environment = {
    "production": true,
    "hmr": false,
    "keycloak": {
        "url": "https://tpm.nebulae.com.co/auth",
        "realm": "TPM",
        "clientId": "EMI",
        "onLoad": "login-required",
        "checkLoginIframe": false,
        "bearerExcludedUrls": [
            "/assets"
        ]
    },
    "api": {
        "gateway": {
            "graphql": {
                "httpEndPoint": "https://tpm.nebulae.com.co/api/gateway/graphql/http",
                "wsEndPoint": "wss://tpm.nebulae.com.co/api/gateway/graphql/ws",
                "graphiqlEndPoint": "https://tpm.nebulae.com.co/api/gateway/graphiql"
            }
        }
    }
};
