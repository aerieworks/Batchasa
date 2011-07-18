(function($) {
    // Constructor
    function PhotoSelector(batchasa, node) {
        var me = this;

		this.batchasa = batchasa;
        this.node = node;
        this.selectedPhotos = [];
		this.onSelectionChanged = null;
    }

	// Sets the album whose photos are to be displayed;
	function setAlbum(album) {
		var control = this;

		this.album = album;
		this.selectedPhotos = [];
		control.node.empty();	
		
		if (album) {
			this.batchasa.getAlbumPhotos(album, function (data) { 
				for (var i = 0; i < data.feed.entry.length; i++) {
					renderPhoto(control, data.feed.entry[i]);
				}
			});
		}
	}

    function renderPhoto(control, photo) {
        var photoNode;
        var photoDate;
        var photoDateText;

        photoNode = $('<div class="selectableItem" />');

        photoNode.append($('<img class="itemThumbnail" />')
            .attr('src', photo.media$group.media$thumbnail[0].url)
        );

        photoNode.append($('<span />').text(photo.title.$t));

        photoDate = new Date(parseInt(photo.gphoto$timestamp.$t));
        photoDateText = (photoDate.getMonth() + 1) + '/' + photoDate.getDate() + '/' +
            photoDate.getFullYear();

        photoNode.append($('<div class="itemSubData" />')
            .append($('<span class="photoDate" />').text(photoDateText))
        );

        if (isSelected(control, photo)) {
            photoNode.addClass('selected');
        }

        photoNode.click(function (ev) {
            if (isSelected(control, photo)) {
                photoNode.removeClass('selected');
                control.selectedPhotos.splice(find(control, photo), 1);
            } else {
                photoNode.addClass('selected');
                control.selectedPhotos.push(photo);
            }
			
			if (typeof control.onSelectionChanged == 'function') {
				control.onSelectionChanged();
			}
        });

        control.node.append(photoNode);
    }

	function find(control, photo) {
		for (var i = 0; i < control.selectedPhotos.length; i++) {
			if (control.selectedPhotos[i] == photo) {
				return i;
			}
		}

		return -1;
	}

	function isSelected(control, photo) {
		return find(control, photo) != -1;
	}

    PhotoSelector.prototype = {
        setAlbum: setAlbum 
    };

    window.Batchasa.UI.PhotoSelector = PhotoSelector;
})(jQuery);

