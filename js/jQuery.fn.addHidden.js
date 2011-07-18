(function ($) {

	// Adds a hidden input to the form.
	function addHidden(form, name, value) {
		var hidden = $('<input type="hidden" />');
		hidden.attr('name', name);
		hidden.val(value);
		form.append(hidden);
	}

	$.fn.addHidden = function (name, value) {
		this.each(function () {
			if (this.nodeName.toLowerCase() == 'form') {
				addHidden($(this), name, value);
			}
		});

		return this;
	};
})(jQuery);
