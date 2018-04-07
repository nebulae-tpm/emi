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
                "uri": "https://dev-tpm.nebulae.com.co/api/gateway/graphql/",
            }
        }
    }
};
