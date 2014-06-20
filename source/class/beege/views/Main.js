qx.Class.define("beege.views.Main", {
	
	extend : qx.ui.container.Composite,
	
	construct : function() {
		this.base(arguments);
		
		var layout = new qx.ui.layout.VBox();
		this.setLayout(layout);
		
		this.header = new beege.views.Header();
		this.add(this.header);
		
		this.toolbar = new beege.views.Toolbar();
		this.add(this.toolbar);
		
		this.body = new beege.views.Body();
		this.add(this.body, {flex : 1});
		
		//this.footer = new beege.views.Footer();
		//this.add(this.footer);
		
		this.initEvent();
	},
	
	members : {
		header : null,
		body : null,
		footer : null,
		
		initEvent : function() {
			var viewGroup = this.toolbar.getViewGroup();
			viewGroup.addListener("changeSelection", function(e) {
				var selected = e.getData()[0];
				var show = selected != null ? selected.getUserData("value") : "";
				var stack = this.body.getStack();
				switch (show) {
					case "log" :
						stack.setSelection([this.body.getLogView()]);
						stack.show();
						break;
					case "task" :
						stack.setSelection([this.body.getTaskView()]);
						stack.show();
						break;	
					default :
						stack.resetSelection();
						stack.exclude();
				}
			}, this);
			
			var themeGroup = this.toolbar.getThemeGroup();
			themeGroup.addListener("changeSelection", function(e) {
				var currentTheme = e.getData()[0].getUserData("value");
				var theme = qx.Theme.getByName(currentTheme);
				if (theme && qx.theme.manager && qx.theme.manager.Meta) {
					qx.theme.manager.Meta.getInstance().setTheme(theme);
					qx.bom.Cookie.set("theme_name", currentTheme);
				}
			}, this);
			
			var runButton = this.toolbar.getRunButton();
			runButton.addListener("execute", function() {
				//conosle.log(this.body.getDesktop());
				//this.body.getUpload().maximize();
				this.body.getWindowManager().bringToFront(this.body.getUpload());
				//this.body.getWindowManager().setDesktop(this.body.getUpload());
			}, this);
			
		}
	},
	
	destruct : function() {
		if (this.header != null) {
			this._disposeObjects("header");
		}
		if (this.body != null) {
			this._disposeObjects("body");
		}
		if (this.footer != null) {
			this._disposeObjects("footer");
		}
	}
});