
var lexer = require('../lib/lexer');

exports['get empty string as null'] = function (test) {
    var lex = lexer.createLexer('');
    
    test.equal(lex.nextToken(), null);
}