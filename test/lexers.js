
var lexers = require('../lib/lexers');

var TokenType = lexers.TokenType;

exports['get empty string as null'] = function (test) {
    var lexer = lexers.createLexer('');
    
    test.equal(lexer.nextToken(), null);
}

exports['get indent and name'] = function (test) {
    var lexer = lexers.createLexer('name');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name');
    
    test.equal(lexer.nextToken(), null);
}

exports['get indent, name, indent, name'] = function (test) {
    var lexer = lexers.createLexer('name\r\nname2');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name2');
    
    test.equal(lexer.nextToken(), null);
}

exports['get indent, name and punctuation'] = function (test) {
    var lexer = lexers.createLexer('    name:');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 4);
    
    token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name');
    
    token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Punctuation);
    test.equal(token.value, ':');
    
    test.equal(lexer.nextToken(), null);
}

exports['get indent, name, punctuation and name value'] = function (test) {
    var lexer = lexers.createLexer('    name: value');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 4);
    
    token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name');
    
    token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Punctuation);
    test.equal(token.value, ':');
    
    token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'value');
    
    test.equal(lexer.nextToken(), null);
}

exports['get indent and integer'] = function (test) {
    var lexer = lexers.createLexer('123');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Integer);
    test.equal(token.value, '123');
    
    test.equal(lexer.nextToken(), null);
}

exports['get indent and real'] = function (test) {
    var lexer = lexers.createLexer('123.45');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.type, TokenType.Real);
    test.equal(token.value, '123.45');
    
    test.equal(lexer.nextToken(), null);
}
