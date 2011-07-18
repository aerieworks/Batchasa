jQuery(function() {
    var authProvider = new Batchasa.AuthorizationProvider(window);

    if (!authProvider.isAuthorized()) {
        authProvider.authorize();
    }
});
