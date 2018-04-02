export const environment = {
    "production": true,
    "hmr"       : false,
    "keycloak": {
        "url": "https://tpm.nebulae.com.co/auth",
        "realm": "TPM",
        "clientId": "EMI",
        "onLoad": "login-required",
        "checkLoginIframe": false,
        "bearerExcludedUrls": [
            "/assets"
        ]
    }
};
