/**
 * Task
 * 
 * @asset(qx/icon/${qx.icontheme}/16/actions/edit-clear.png)
 * @asset(qx/icon/${qx.icontheme}/16/categories/system.png)
 * @asset(qx/icon/${qx.icontheme}/16/status/dialog-information.png)
 * @asset(qx/icon/${qx.icontheme}/16/status/dialog-warning.png)
 * @asset(qx/icon/${qx.icontheme}/16/status/dialog-error.png)
 */

qx.Class.define("beege.views.Task", {
	
	extend : qx.ui.container.Composite,

	construct : function() {
		var layout = new qx.ui.layout.VBox();
		layout.setSeparator("separator-vertical");
		this.base(arguments, layout);
		this.setDecorator("main");
		
		var caption = new qx.ui.basic.Label(this.tr("Task")).set({
			font : "bold",
			padding : 10,
			alignY : "middle",
			allowGrowX : true,
			allowGrowY : true
		});

		// toolbar of the log pane
		this.__toolbar = new qx.ui.toolbar.ToolBar();
		this.__toolbar.add(caption);
		this.__toolbar.addSpacer();
		this.__toolbar.setBackgroundColor("white");
		var clearButton = new qx.ui.toolbar.Button(this.tr("Clear"), "icon/16/actions/edit-clear.png");
		clearButton.addListener("execute", function(e) {
			
		}, this);
		this.__toolbar.add(clearButton);
		this.add(this.__toolbar);

		// log pane
		var taskArea = new qx.ui.embed.Html('');
		taskArea.set({
			backgroundColor : "white",
			overflowY : "scroll",
			overflowX : "auto",
			font : "monospace",
			padding : 3
		});
		this.add(taskArea, {
			flex : 1
		});

		// log appender
		this.__taskAppender = new qx.log.appender.Element();
		qx.log.Logger.unregister(this.__taskAppender);

		// Directly create DOM element to use
		this.__taskElem = document.createElement("DIV");
		this.__taskAppender.setElement(this.__taskElem);

		taskArea.addListenerOnce("appear", function() {
			
		}, this);
	},

	properties : {
		
	},

	members : {
		__taskElem : null,
		__taskAppender : null,
		__toolbar : null

	},
	
	destruct : function() {
		this._disposeObjects("__taskAppender");
		this.__taskElem = null;
	}
});