export const environment = {
    "production": true,
    "hmr"       : false,
    "keycloak": {
        "url": "https://qa-tpm.nebulae.com.co/auth",
        "realm": "QA_TPM",
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
                "httpEndPoint": "https://qa-iot.nebulae.com.co/api/gateway/graphql/http",
                "wsEndPoint": "wss://qa-iot.nebulae.com.co/api/gateway/graphql/ws",
                "graphiqlEndPoint": "https://qa-iot.nebulae.com.co/api/gateway/graphiql"
            }
        }
    }
};
