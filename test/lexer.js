
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

exports['get indent, name, indent, name'] = function (test) {
    var lex = lexer.createLexer('name\r\nname2');
    
    var token = lex.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lex.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name');
    
    var token = lex.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lex.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name2');
    
    test.equal(lex.nextToken(), null);
}

exports['get indent, name and punctuation'] = function (test) {
    var lex = lexer.createLexer('    name:');
    
    var token = lex.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 4);
    
    token = lex.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name');
    
    token = lex.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Punctuation);
    test.equal(token.value, ':');
    
    test.equal(lex.nextToken(), null);
}