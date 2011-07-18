(function ($) {
    // Constructor
    function PhotoList() {
        this.photoList = [];
        this.onListChanged = null;
    }

    function listChanged(control) {
        if (typeof control.onListChanged == 'function') {
            control.onListChanged()
        }
    }

    function indexOf(control, photo) {
        var photoID = photo.gphoto$id.$t;

        for (var i = 0; i < control.photoList.length; i++) {
            if (control.photoList[i].gphoto$id.$t == photoID) {
                return i;
            }
        }

        return -1;
    }

    // Adds a photo to the list.
    function add(photo) {
        this.photoList.push(photo);
        listChanged(this);
    }

    // Removes a photo from the list.
    function remove(photo) {
        var index = indexOf(this, photo);

        if (index >= 0) {
            this.photoList.splice(index, 1);
        }

        listChanged(this);
    }

    // Returns whether or not the list contains the specified photo.
    function contains(photo) {
        return indexOf(this, photo) >= 0;
    }

    // Gets the number of photos in the list.
    function getCount() {
        return this.photoList.length;
    }

    // Gets the photos in the list;
    function getPhotos() {
        return this.photoList;
    }

    PhotoList.prototype = {
        add: add,
        remove: remove,
        contains: contains,
        getPhotos: getPhotos,
        getCount: getCount
    };

    window.Batchasa.PhotoList = PhotoList;
})(jQuery);
