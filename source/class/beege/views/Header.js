/**
 * Header
 *
 * @asset(beege/images/e_banner.png)
 */

qx.Class.define("beege.views.Header", {
	
	extend : qx.ui.container.Composite,

	construct : function() {
		this.base(arguments);
		
		var layout = new qx.ui.layout.HBox();
		//layout.setAlignX("left");
		this.setLayout(layout);
		
		/*var logo = new qx.ui.basic.Image("beege/images/e_banner.png");
		logo.setAlignY("middle");
		logo.setHeight(65);
		logo.setWidth(599);
		this.add(logo);*/
		
		//var widget = new qx.ui.core.Widget();
		//widget.setHeight(65);
		//this.add(widget);
		
		var title = new qx.ui.basic.Label("Docker Admin console");
		this.add(title);
		
		this.setAppearance("app-header");
		
		this.add(new qx.ui.core.Spacer, {flex : 1});
		
		var version = new qxc.ui.versionlabel.VersionLabel();
		version.setFont("default");
		this.add(version);

		//this.setBackgroundColor("#3F6486");
	}
});