export const environment = {
    "production": false,
    "hmr"       : false,
    "keycloak": {
        "url": "http://localhost:8080/auth",
        "realm": "DEV_TPM",
        "clientId": "EMI",
        "onLoad": "login-required",
        "checkLoginIframe": false,
        "bearerExcludedUrls": [
            "/assets"
        ]
    }
};
