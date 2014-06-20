/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Theme.define("beege.theme.IndigoAppearance", {
	extend : qx.theme.indigo.Appearance,
	appearances : {
		"tree-package" : {
			style : function(states) {
				return {
					icon : "beege/images/package18.gif",
					paddingTop: 5
				};
			}
		}
	}
});