(function($) {
    var authUrlBase = 'https://accounts.google.com/o/oauth2/auth?client_id=196499548048.apps.googleusercontent.com&scope=https://picasaweb.google.com/data/&response_type=token&redirect_uri=';
    var tokenRegEx = /^#access_token=([^&]+)/;

    // Constructor
    function AuthorizationProvider(theWindow) {
        this.window = theWindow;
        this.token = null;
    }

    // Gets the authorization token.  Returns null if the current user is not authorized.
    function getToken() {
        var tokenMatch;
        var token;

        if (this.token == null) {
            // Get auth token and create service instance.
            tokenMatch = tokenRegEx.exec(this.window.location.hash);
            if (tokenMatch) {
                this.token = tokenMatch[1];
            }
        }

        return this.token;
    }

    // Directs the user to Google's OAuth 2.0 authorization page.
    function authorize() {
        this.window.location = authUrlBase + this.window.location;
    }

    // Gets whether or not the user is currently authorized.
    function isAuthorized() {
        return this.getToken() != null;
    }

    AuthorizationProvider.prototype = {
        getToken: getToken,
        authorize: authorize,
        isAuthorized: isAuthorized
    };

    window.Batchasa.AuthorizationProvider = AuthorizationProvider;
})(jQuery);

