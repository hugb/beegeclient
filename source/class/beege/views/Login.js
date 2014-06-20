/**
 * @asset(beege/images/user_16.png)
 */
qx.Class.define("beege.views.Login", {

	extend : qx.ui.window.Window,

	construct : function() {
		this.base(arguments);

		this.set({
			showStatusbar : true,
			status : "",
			allowClose : false,
			allowMaximize : false,
			allowMinimize : false,
			caption : this.tr("Login"),
			height : 180,
			width : 250,
			showClose : false,
			showMaximize : false,
			showMinimize : false,
			movable : false,
			useMoveFrame : false,
			useResizeFrame : false,
			resizable : [false, false, false, false],
			modal : false,
			icon : "beege/images/user_16.png"
		});
		
		//this.setAppearance("login");

		this.setLayout(new qx.ui.layout.VBox(10));

		this.createForm();
	},

	members : {
		createForm : function() {
			var form = new qx.ui.form.Form();

			var account = new qx.ui.form.TextField();
			account.setValue("admin@admin.com");
			account.setRequired(true);
			account.setRequiredInvalidMessage(this.tr("Please input your account"));
			account.setToolTipText(this.tr("For example admin@admin.com"));
			account.setPlaceholder(this.tr("Please input your account"));
			form.add(account, this.tr("Account"), qx.util.Validate.email(this.tr("Please use email")));

			var password = new qx.ui.form.PasswordField();
			password.setValue("admin");
			password.setMaxLength(12);
			password.setRequired(true);
			password.setRequiredInvalidMessage(this.tr("Please input your password"));
			password.setToolTipText(this.tr("Length 6-12"));
			password.setPlaceholder(this.tr("Please input your password"));
			form.add(password, this.tr("Password"));

			var remember = new qx.ui.form.CheckBox();
			remember.setToolTipText(this.tr("One week auto login"));
			form.add(remember, this.tr("Remember"));

			var sendButton = new qx.ui.form.Button(this.tr("Login"));
			form.addButton(sendButton);

			sendButton.addListener("execute", function() {
				if (form.validate()) {
					this.setStatus(this.tr("Login ..."));
					beege.models.WebSocket.getInstance().send({
						cmd : "login",
						data : {
							account : account.getValue(),
							password : password.getValue()
						}
					});
				}
			}, this);

			beege.models.WebSocket.getInstance().addListener("login", function(evt) {
				var data = evt.getData();
				switch (data.code) {
					case 0 :
						this.close();
						break;
					case 1 :
						// 未登录
						break;
					case 2 :
						this.setStatus("");
						account.setValid(false);
						account.setInvalidMessage(this.tr("Invalid account"));
						break;
					case 3 :
						this.setStatus("");
						password.setValid(false);
						password.setInvalidMessage(this.tr("Invalid password"));
						break;
					case 4 :
						this.setStatus("");
						password.setValid(false);
						password.setInvalidMessage(this.tr("Invalid account or password"));
						break;
					default :
						qx.log.Logger.debug(new Date() + " login success");
				}
			}, this);

			var resetButton = new qx.ui.form.Button(this.tr("Reset"));
			form.addButton(resetButton);

			resetButton.addListener("execute", function() {
				form.reset();
			}, this);

			var render = new qx.ui.form.renderer.Single(form);
			var renderLayout = render.getLayout();
			renderLayout.setColumnAlign(0, "left", "top");
			renderLayout.setColumnWidth(0, 20);
			renderLayout.setColumnFlex(1, 1);

			this.add(render);
		}
	}
});