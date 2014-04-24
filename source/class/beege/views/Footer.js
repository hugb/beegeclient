qx.Class.define("beege.views.Footer", {

	extend : qx.ui.container.Composite,

	construct : function() {
		this.base(arguments);

		var layout = new qx.ui.layout.HBox();
		layout.setSpacing(5);
		layout.setAlignX("center");
		this.setLayout(layout);

		var copyright = new qx.ui.basic.Label(this.tr("Copyright"));
		copyright.setAlignY("middle");
		this.add(copyright);

		this.setHeight(50);
		this.setAppearance("app-footer");
	},

	members : {

	}
});