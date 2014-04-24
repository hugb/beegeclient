/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Theme.define("beege.theme.Appearance", {
	extend : qx.theme.modern.Appearance,
	include : qx.theme.Indigo.Appearance,
	appearances : {
		"app-header" : {
			style : function(states) {
				return {
					font : "headline",
					textColor : "text-selected",
					decorator: "app-header",
					padding : 10
				};
			}
		},
		"app-header-label" : {
			style : function(states) {
				return {
					paddingTop : 5
				};
			}
		},
		"app-footer" : {
			style : function(states) {
				return {
					textColor : "text-selected",
					decorator: "app-footer",
					padding : 5
				};
			}
		}
	}
});