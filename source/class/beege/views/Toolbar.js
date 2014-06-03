/**
 * This ${mySizes}
 * 
 * @asset(qx/icon/Tango/22/actions/media-playback-start.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-color-chooser.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-log-viewer.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/internet-web-browser.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-help.png)
 * @asset(qx/icon/${qx.icontheme}/22/mimetypes/executable.png)
 * @asset(beege/images/user_22.png)
 */

qx.Class.define("beege.views.Toolbar", {

	extend : qx.ui.toolbar.ToolBar,

	construct : function() {
		this.base(arguments);

		this.__createBar();
	},

	members : {
		__viewGroup : null,
		__themeGroup : null,

		__runButton : null,

		__createBar : function() {
			this.__runButton = new qx.ui.toolbar.Button(this.tr("Run"), "icon/22/actions/media-playback-start.png");
			this.add(this.__runButton);
			
			this.__runButton.addListener("execute", function(){
				beege.models.WebSocket.getInstance().send({cmd : "menu", data : ""});
			}, this);

			var menuPart = new qx.ui.toolbar.Part();
			this.add(menuPart);

			var themeMenu = new qx.ui.menu.Menu();

			var t1 = new qx.ui.menu.RadioButton(this.tr("Modern"));
			t1.setUserData("value", "beege.theme.Theme");
			themeMenu.add(t1);

			var t2 = new qx.ui.menu.RadioButton(this.tr("Indigo"));
			t2.setUserData("value", "beege.theme.Indigo");
			t2.setValue(true);
			themeMenu.add(t2);
			
			var t3 = new qx.ui.menu.RadioButton(this.tr("Classic"));
			t3.setUserData("value", "qx.theme.Classic");
			themeMenu.add(t3);
			
			var t4 = new qx.ui.menu.RadioButton(this.tr("Manager"));
			t4.setUserData("value", "qx.theme.Manager");
			themeMenu.add(t4);
			
			var t5 = new qx.ui.menu.RadioButton(this.tr("Simple"));
			t5.setUserData("value", "qx.theme.Simple");
			themeMenu.add(t5);

			this.__themeGroup = new qx.ui.form.RadioGroup(t1, t2, t3, t4, t5);

			var themeButton = new qx.ui.toolbar.MenuButton(this.tr("Theme"), "icon/22/apps/utilities-color-chooser.png", themeMenu);
			themeButton.setToolTipText(this.tr("Choose theme"));
			menuPart.add(themeButton);

			this.addSpacer();
			
			this.__userButton = new qx.ui.toolbar.Button(this.tr("User"), "beege/images/user_22.png");
			this.add(this.__userButton);

			var viewPart = new qx.ui.toolbar.Part();
			this.add(viewPart);

			var logView = new qx.ui.toolbar.RadioButton(this.tr("Log"), "icon/22/apps/utilities-log-viewer.png");
			logView.setToolTipText(this.tr("Display log file"));
			logView.setUserData("value", "log");
			logView.setModel("log");
			viewPart.add(logView);

			var taskView = new qx.ui.toolbar.RadioButton(this.tr("Task"), "icon/22/apps/internet-web-browser.png");
			taskView.setToolTipText(this.tr("Display my task"));
			taskView.setUserData("value", "task");
			taskView.setModel("task");
			viewPart.add(taskView);

			this.__viewGroup = new qx.ui.form.RadioGroup();
			this.__viewGroup.setAllowEmptySelection(true);
			this.__viewGroup.add(logView, taskView);		
			
			var menu = new qx.ui.menu.Menu;
			var checkBtn = new qx.ui.menu.CheckBox(this.tr("Check"));
			menu.add(checkBtn);

			menu.addSeparator();
			
			var aboutBtn = new qx.ui.menu.Button(this.tr("About"));
			menu.add(aboutBtn);
			
			this.__helpButton = new qx.ui.toolbar.MenuButton(this.tr("Help"), "icon/22/apps/utilities-help.png", menu);
			this.__helpButton.setToolTipText("Debugging options");
			this.add(this.__helpButton);
		},

		getViewGroup : function() {
			return this.__viewGroup;
		},

		getThemeGroup : function() {
			return this.__themeGroup;
		},

		getRunButton : function() {
			return this.__runButton;
		}
	}
});