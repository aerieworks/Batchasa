(function($) {
    // Constructor
    function PicasaService(authorizationProvider) {
        this.authProvider = authorizationProvider;
    }

    // Gets the specified feed from Picasa.
    function get(feed, callback) {
        var data = {
            authToken: this.authProvider.getToken(),
            feed: feed
        };

        $.ajax({
            url: 'gdata.php',
            type: 'GET',
            dataType: 'json',
            data: data,
            success: function (result) {
                callback(result);
            }
        });
    }

    PicasaService.prototype = {
        get: get
    };

    window.Batchasa.PicasaService = PicasaService;
})(jQuery);

