jQuery(function() {
    var authProvider = new Batchasa.AuthorizationProvider();

    if (!authProvider.isAuthorized()) {
        authProvider.authorize();
    }
});
