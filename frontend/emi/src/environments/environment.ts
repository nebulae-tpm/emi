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
                "httpEndPoint": "https://dev-iot.nebulae.com.co/api/emi-gateway/graphql/http",
                "wsEndPoint": "wss://dev-iot.nebulae.com.co/api/emi-gateway/graphql/ws",
                "graphiqlEndPoint": "https://dev-iot.nebulae.com.co/api/emi-gateway/graphiql"
            }
        }
    }
};
