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
                "uri": "https://tpm.nebulae.com.co/api/gateway/graphql/",
                "ws": "wss://tpm.nebulae.com.co/api/gateway/graphql/wss",
            }
        }
    }
};
