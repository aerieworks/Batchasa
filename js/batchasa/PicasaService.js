(function($) {
    var picasaUrlBase = 'https://picasaweb.google.com/data/feed/api/';
    var urlParameters = '?v=2&alt=json&callback=';
    var callbackName = '__batchasa_picasaCallback';
    var oauthTokenParam = '&oauth_token=';

    // Constructor
    function PicasaService(authorizationProvider) {
        this.token = authorizationProvider.getToken();
    }

    // Gets the specified feed from Picasa.
    function get(feed, callback) {
        var script;
        
        function callbackWrapper(result) {
            script.remove();
            callback(result);
        }
        window[callbackName] = callbackWrapper;

        script = $('<script />')
            .attr('type', 'text/javascript')
            .attr('src', picasaUrlBase + feed + urlParameters + callbackName +
                oauthTokenParam + this.token);
        $('body').append(script);
    }

    PicasaService.prototype = {
        get: get
    };

    window.Batchasa.PicasaService = PicasaService;
})(jQuery);

