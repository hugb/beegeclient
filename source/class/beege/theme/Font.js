/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Theme.define("beege.theme.Font", {
	extend : qx.theme.modern.Font,
	fonts : {
		"headline" : {
			size : 22,
			family : ["serif"],
			sources : [{
				family : "JosefinSlab",
				source: [
					"qx/decoration/Indigo/font/JosefinSlab-SemiBold.woff",
					"qx/decoration/Indigo/font/JosefinSlab-SemiBold.ttf"
				]
			}]
		}
	}
});