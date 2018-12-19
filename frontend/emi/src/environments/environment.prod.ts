export const environment = {
    "production": true,
    "hmr": false,
    "keycloak": {
        "url": "https://iot.nebulae.com.co/auth",
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
                "httpEndPoint": "https://iot.nebulae.com.co/api/emi-gateway/graphql/http",
                "wsEndPoint": "wss://iot.nebulae.com.co/api/emi-gateway/graphql/ws",
                "graphiqlEndPoint": "https://iot.nebulae.com.co/api/emi-gateway/graphiql"
            }
        }
    }
};
