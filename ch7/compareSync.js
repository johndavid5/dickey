/*
 * c:\inetpub\wwwroot\dickey\ch7>node
 * > require('bcrypt').hashSync('pass', 10);
 * '$2a$10$CO8AnTEH.HcfQYMdExCHPOVTzOJv9Oad0yb2KojgX0qoMhrTF1.Ui'
 * > require('bcrypt').hashSync('pass', 10);
 * '$2a$10$9L0/OanpMzkQUeWJM3CTIev3BloXFR./g.9CzeQh07R8W9Uhh7bum'
 * > require('bcrypt').hashSync('pass', 10);
 * '$2a$10$ib9sDz0KbVtRvP.LNm7TW.d/XK0tTfnXvJdR2iIO4RL5aJ11vWFM6'
 * > require('bcrypt').hashSync('pass', 10);
 * '$2a$10$VlUY810ba1lKQ6RJAzB9yOWhdncD8Leq7oa6k4Aw8NImp/IMvvJPO'
*/
var bcrypt = require('bcrypt');
var password = 'pass';
var hashees =
[
 '$2a$10$CO8AnTEH.HcfQYMdExCHPOVTzOJv9Oad0yb2KojgX0qoMhrTF1.Ui',
 '$2a$10$9L0/OanpMzkQUeWJM3CTIev3BloXFR./g.9CzeQh07R8W9Uhh7bum',
 '$2a$10$ib9sDz0KbVtRvP.LNm7TW.d/XK0tTfnXvJdR2iIO4RL5aJ11vWFM6',
 '$2a$10$VlUY810ba1lKQ6RJAzB9yOWhdncD8Leq7oa6k4Aw8NImp/IMvvJPO',
 // replace 'JPO' with 'XXX'...
 '$2a$10$VlUY810ba1lKQ6RJAzB9yOWhdncD8Leq7oa6k4Aw8NImp/IMvvXXX', 
];

for( var i = 0; i < hashees.length; i++ ){
	console.log( "bcrypt.compareSync('" + password + "', '" + hashees[i] + "')\n" +
	   "\t" + "= " + bcrypt.compareSync(password, hashees[i] ) + "...\n"
	);
}
