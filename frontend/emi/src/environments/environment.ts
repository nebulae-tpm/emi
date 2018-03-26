export const environment = {
    "production": false,
    "hmr": false,
    "keycloak": {
        "url": "http://dev-tpm.nebulae.com.co/auth",
        "realm": "DEV_TPM",
        "clientId": "EMI",
        "onLoad": "login-required",
        "checkLoginIframe": false,
        "bearerExcludedUrls": [
            "/assets"
        ]
    }
};
