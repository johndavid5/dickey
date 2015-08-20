var JUtils = {

	debug: 0, 

	/* Hammer-and-tongs-macho-wacho way to add commas to a number...
	* perhaps it's faster than using fancy-schmancy regular
	* expressions... */
	commify: function( input ){

		var sWho = "JUtils::commify";

		input = "" + input; // coerce to string.

		input = input.trim();

		JUtils.debugPrint(sWho + "(): input = '" + input + "'...");

		var iWhere = input.lastIndexOf(".");

		var sLeft = "";
		var sDot = "";
		var sRight = "";

		// If has decimal point, break into left and right
		// and add commas only to the "left" part...
		if( iWhere >= 0 ){ 
			sLeft = input.substring(0, iWhere);
			sDot = ".";
			sRight = input.substring(iWhere+1);
		}
		else {
			sLeft = input;
			sDot = "";
			sRight = "";
		}

		var len = sLeft.length; 
		var sLeftOut = "";
		var iCount = 0;
		var leChar = "";
		for( var i = len-1; i >= 0; i-- ){
			iCount++;	
			leChar = sLeft.substr(i, 1);
			JUtils.debugPrint(sWho + "(): i=", i,", iCount = ", iCount, ", leChar = '" + leChar + "'...");
			JUtils.debugPrint(sWho + "(): i=", i,": BEFORE: sLeftOut = '" + sLeftOut + "'...");
			if( iCount > 1 && (iCount-1) % 3 == 0){
				sLeftOut = "," + sLeftOut;
			}
			sLeftOut = leChar + sLeftOut;
			JUtils.debugPrint(sWho + "(): i=", i,": AFTER: sLeftOut = '" + sLeftOut + "'...");
			JUtils.debugPrint(sWho + "==============================================");
		}

		return sLeftOut + sDot + sRight;
	},

	//debugPrint: function( s_input ){
	//	if( JUtils.debug ){
	//		console.log( s_input );
	//	}
	//},

	// Passes variable args to console.log()...
	debugPrint: function(){
		if( JUtils.debug ){
			console.log.apply(this, arguments);
		}
	},

}/* var JUtils = */

module.exports = JUtils;
