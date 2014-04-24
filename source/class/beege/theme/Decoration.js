/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Theme.define("beege.theme.Decoration", {
	extend : qx.theme.modern.Decoration,
	decorations : {
		"app-header" : {
			style : {
				innerWidthBottom : 1,
				innerColorBottom: "highlight-shade",
				widthBottom: 9,
				colorBottom: "highlight",
				
				gradientStart : ["#505154", 0],
				gradientEnd : ["#323335", 100],
				
				backgroundColor : "#323335"
			}
		},
		"app-footer" : {
			style : {		
				backgroundColor : "#323335"
			}
		}
	}
});