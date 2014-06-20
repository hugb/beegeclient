/**
 * Demonstrates qx.ui.window(...):
 * 
 * Desktop, Window
 * 
 * 
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-calculator.png)
 */
qx.Class.define("beege.views.Settings", {

	extend : qx.ui.window.Window,

	construct : function() {
		this.base(arguments);

		this.set({
			showStatusbar : false,
			allowMaximize : false,
			allowMinimize : false,
			caption : this.tr("Settings"),
			height : 180,
			width : 250,
			showMaximize : false,
			showMinimize : false,
			movable : false,
			useMoveFrame : false,
			useResizeFrame : false,
			resizable : [false, false, false, false],
			modal : false,
			icon : "beege/images/user_16.png",
			layout : new qx.ui.layout.VBox(10)
		});

		this.createAtom();
		this.createConfig();

	},

	members : {
		createAtom : function() {
			var atom = new qx.ui.basic.Atom("The second window", "icon/22/apps/utilities-calculator.png");
			this.add(atom);
		},

		createConfig : function() {
			var box = new qx.ui.container.Composite();
			box.setLayout(new qx.ui.layout.HBox(10));
			this.add(box, {flex : 1});

			var langSettings = new qx.ui.groupbox.GroupBox(this.tr("Lang"));
			langSettings.setLayout(new qx.ui.layout.VBox(4));
			box.add(langSettings, {flex : 1});

			var langRadioButtonGroup = new qx.ui.form.RadioButtonGroup();
			langSettings.add(langRadioButtonGroup);
			langRadioButtonGroup.addListener("changeSelection", function(evt) {
				var langName = evt.getData()[0].getUserData("value");
				qx.bom.Cookie.set("lang_name", langName);
				qx.locale.Manager.getInstance().setLocale(langName);
			});

			var currentLangName = qx.bom.Cookie.get("lang_name");
			var en = new qx.ui.form.RadioButton(this.tr("English"));
			en.setUserData("value", "en");
			en.setValue(currentLangName == "en");
			langRadioButtonGroup.add(en);

			var zh = new qx.ui.form.RadioButton(this.tr("Simple chinese"));
			zh.setUserData("value", "zh");
			zh.setValue(currentLangName == "zh");
			langRadioButtonGroup.add(zh);
			
			
			var themeSettings = new qx.ui.groupbox.GroupBox(this.tr("Theme"));
			themeSettings.setLayout(new qx.ui.layout.VBox(4));
			box.add(themeSettings, {flex : 1});

			var themeRadioButtonGroup = new qx.ui.form.RadioButtonGroup();
			themeSettings.add(themeRadioButtonGroup);
			themeRadioButtonGroup.addListener("changeSelection", function(evt) {
				var themeName = evt.getData()[0].getUserData("value");
				qx.bom.Cookie.set("theme_name", themeName);
				var theme = qx.Theme.getByName(themeName);
				if (theme && qx.theme.manager && qx.theme.manager.Meta) {
					qx.theme.manager.Meta.getInstance().setTheme(theme);
				}
			});

			var currentThemeName = qx.bom.Cookie.get("theme_name");
			var modern = new qx.ui.form.RadioButton(this.tr("Modern"));
			modern.setUserData("value", "beege.theme.Theme");
			modern.setValue(currentThemeName == "beege.theme.Theme");
			themeRadioButtonGroup.add(modern);

			var indigo = new qx.ui.form.RadioButton(this.tr("Indigo"));
			indigo.setUserData("value", "beege.theme.Indigo");
			indigo.setValue(currentThemeName == "beege.theme.Indigo");
			themeRadioButtonGroup.add(indigo);
		}
	}
});