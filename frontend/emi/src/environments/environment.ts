export const environment = {
    "production": false,
    "hmr": false,
    "keycloak": {
        "url": "https://dev-tpm.nebulae.com.co/auth",
        "realm": "DEV_TPM",
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
                "httpEndPoint": "https://dev-tpm.nebulae.com.co/api/gateway/graphql/http",
                "wsEndPoint": "wss://dev-tpm.nebulae.com.co/api/gateway/graphql/ws",
                "graphiqlEndPoint": "https://dev-tpm.nebulae.com.co/api/gateway/graphiql",
            }
        }
    }
};
