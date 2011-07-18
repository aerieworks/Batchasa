(function($) {
    // Constructor
    function AlbumSelector(node) {
        this.node = node;
		this.selectedAlbum = null;
		this.selectedAlbumNode = null;
        this.onSelectionChanged = null;
    }

    // Sets the albums displayed within the album list to the albums contained in the
    //  specified feed.
    function setAlbums(albumFeed) {
        for (var i = 0; i < albumFeed.feed.entry.length; i++) {
            renderAlbum(this, albumFeed.feed.entry[i]);
        }
    }

    function renderAlbum(control, album) {
        var albumNode;
        var albumDate;
        var albumDateText;
        var numPhotos;
        var numPhotosText;

        albumNode = $('<div class="selectableItem" />');

        albumNode.append($('<img class="itemThumbnail" />')
            .attr('src', album.media$group.media$thumbnail[0].url)
        );

        albumNode.append($('<span />').text(album.title.$t));

        albumDate = new Date(parseInt(album.gphoto$timestamp.$t));
        albumDateText = (albumDate.getMonth() + 1) + '/' + albumDate.getDate() + '/' +
            albumDate.getFullYear();

        numPhotos = album.gphoto$numphotos.$t;
        numPhotosText = numPhotos + (numPhotos == 1 ? ' photo' : ' photos');

        albumNode.append($('<div class="itemSubData" />')
            .append($('<span class="albumDate" />').text(albumDateText))
            .append($('<span />').text(numPhotosText))
        );

        albumNode.click(function (ev) {
			if (control.selectedAlbumNode) {
				// Remove styling from previously selected album.
				control.selectedAlbumNode.removeClass('selected');
			}

			if (control.selectedAlbum !== album) {
				// A new album was selected.
            	control.selectedAlbumNode = albumNode;
				control.selectedAlbum = album;
            	albumNode.addClass('selected');
			} else {
				// Album deselected.
				control.selectedAlbumNode = null;
				control.selectedAlbum = null;
			}

            if (typeof control.onSelectionChanged == 'function') {
               	control.onSelectionChanged();
            }
        });

        control.node.append(albumNode);
    }

    AlbumSelector.prototype = {
        setAlbums: setAlbums
    };

    window.Batchasa.UI.AlbumSelector = AlbumSelector;
})(jQuery);

