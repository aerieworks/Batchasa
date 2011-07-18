(function ($) {
	var defaults;

	// Constructor
	function Page(pageNode) {
		var me = this;

		this.node = pageNode;
		this.nextPage = null;
		this.previousPage = null;
		this.onShow = null;
		this.btnNext = $('.batchasa-page-nextButton', pageNode);
		this.btnPrevious = $('.batchasa-page-previousButton', pageNode);

		this.setCanGoNext(false);

		this.btnNext.click(function (ev) { gotoPage(me, me.nextPage); });
		this.btnPrevious.click(function (ev) { gotoPage(me, me.previousPage); });
	}

	function gotoPage(control, page) {
		if (page) {
			control.node.hide();
			page.show();
		}
	}

	// Enables or disables advancing to the next page.
	function setCanGoNext(canGoNext) {
		if (canGoNext) {
			this.btnNext.removeAttr('disabled');
		} else {
			this.btnNext.attr('disabled', 'disabled');
		}
	}

	// Sets the page to display when the 'next' button is clicked.
	function setNextPage(nextPage) {
		this.nextPage = nextPage;
		nextPage.previousPage = this;
	}

	// Shows the page.
	function show() {
		this.node.show();

		if (typeof this.onShow == 'function') {
			this.onShow();
		}
	}

	Page.prototype = {
		setCanGoNext: setCanGoNext,
		setNextPage: setNextPage,
		show: show
	};

	window.Batchasa.UI.Page = Page;
})(jQuery);
