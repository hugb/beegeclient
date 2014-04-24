/**
 * 
 * Menu
 * 
 */

qx.Class.define("beege.views.Accordion", {

	extend : qx.ui.container.Composite,

	construct : function() {
		this.base(arguments);

		this.setLayout(new qx.ui.layout.VBox(2));

		this.BtnArray = new Array();
		this.ObjArray = new Array();
	},

	properties : {
		btnCount : {
			check : "Number",
			init : 0
		},
		btnSelected : {
			check : "Number",
			init : 0
		}
	},

	members : {

		btnClicked : function(i) {
			this.setBtnSelected(i);
			this.updateAccordion();
		},

		addBtn : function(pos, caption, container) {
			var curBtnCount = this.getBtnCount();

			if (curBtnCount == 0) {
				if (this.getBtnSelected() == 0) {
					this.setBtnSelected(0);
				}
			}

			this.setBtnCount(curBtnCount + 1);

			if (pos > curBtnCount) {
				pos = curBtnCount;
			}
			if (pos < curBtnCount) {
				var i = curBtnCount;
				do {
					this.BtnArray[i - 1].removeListener("execute", function(e) {

					}, this);

					this.BtnArray[i] = this.BtnArray[i - 1];

					this.BtnArray[i].addListener("execute", function(e) {
						this.btnClicked(i);
					}, this);

					i--;
				} while (i > pos);
			}

			this.BtnArray[pos] = new qx.ui.form.Button(caption);
			this.BtnArray[pos].setCenter(false);
			this.ObjArray[pos] = container;

			this.BtnArray[pos].addListener("execute", function(e) {
				this.btnClicked(pos);
			}, this);

			this.updateAccordion();
		},

		updateAccordion : function() {
			var curBtnCount = this.getBtnCount();
			var selectedBtn = this.getBtnSelected();

			this.removeAll();

			var i = 0;
			while (i <= selectedBtn) {
				this.add(this.BtnArray[i]);
				if (i == selectedBtn) {
					try {
						this.add(this.ObjArray[i], {
							flex : 1
						});
					} catch (ex) {
					}
				}
				i++;
			}
			;

			while (i < curBtnCount) {
				this.add(this.BtnArray[i]);
				i++;
			}
			;
		}
	}
});