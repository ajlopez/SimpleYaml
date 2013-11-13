
var lexer = require('../lib/lexer');

var TokenType = lexer.TokenType;

exports['get empty string as null'] = function (test) {
    var lex = lexer.createLexer('');
    
    test.equal(lex.nextToken(), null);
}

exports['get indent and name'] = function (test) {
    var lex = lexer.createLexer('name');
    
    var token = lex.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lex.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name');
    
    test.equal(lex.nextToken(), null);
}

