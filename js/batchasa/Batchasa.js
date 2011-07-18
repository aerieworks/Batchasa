(function ($) {
    window.Batchasa = {};

    // Constructor 
    function Batchasa(authorizationProvider, picasaService) {
        this.picasa = picasaService;
        this.authProvider = authorizationProvider;

    }

    // Gets the list of albums owned by the authenticated user.
    function getUserAlbums(callback) {
        this.picasa.get('user/default', callback);
    }

    function getAlbumPhotos(album, callback) {
        this.picasa.get('user/default/albumid/' + album.gphoto$id.$t, callback);
    }

    Batchasa.prototype = {
        getUserAlbums: getUserAlbums,
        getAlbumPhotos: getAlbumPhotos
    };

    window.Batchasa.Batchasa = Batchasa;
})(jQuery);

