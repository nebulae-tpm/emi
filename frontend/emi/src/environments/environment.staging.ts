export const environment = {
    "production": true,
    "hmr"       : false,
    "keycloak": {
        "url": "http://qa-tpm.nebulae.com.co/auth",
        "realm": "QA_TPM",
        "clientId": "EMI",
        "onLoad": "login-required",
        "checkLoginIframe": false,
        "bearerExcludedUrls": [
            "/assets"
        ]
    }
};
