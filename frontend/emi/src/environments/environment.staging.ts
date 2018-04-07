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
                "uri": "https://qa-tpm.nebulae.com.co/api/gateway/graphql/",
            }
        }
    }
};
