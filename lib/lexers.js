
var TokenType = { Indent: 1, Name: 2, Integer: 3, Punctuation: 4 };
var punctuations = ":";

function Lexer(text) {
    var position = 0;
    var length = text ? text.length : 0;
    var lastindent = false;
    
    this.nextToken = function() {
        if (position >= length)
            return null;
            
        if (position === 0 && !lastindent)
            return nextIndent();
            
        while (position < length && text[position] <= ' ') {
            position++;
            if (text[position-1] == '\n' && !lastindent)
                return nextIndent();
        }
        
        var ch = text[position];
        
        if (isPunctuation(ch)) {
            position++
            return { value: ch, type: TokenType.Punctuation };
        }
        
        if (isDigit(ch))
            return nextInteger();

        lastindent = false;        
        return nextName();
    };
    
    function nextInteger() {
        var value = '';
    
        while (position < length && isDigit(text[position]))
            value += text[position++];
            
        return { type: TokenType.Integer, value: value };
    }
    
    function nextName() {
        var value = '';
    
        while (position < length && text[position] > ' ' && !isPunctuation(text[position]))
            value += text[position++];
            
        return { type: TokenType.Name, value: value };
    }
    
    function nextIndent() {
        var value = 0;
        lastindent = true;
        
        while (text[position] <= ' ') {
            position++;
            value++;
        }
        
        return { value: value, type: TokenType.Indent };
    }
}

function createLexer(text) {
    return new Lexer(text);
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

function isPunctuation(ch) {
    return punctuations.indexOf(ch) >= 0;
}

module.exports = {
    createLexer: createLexer,
    TokenType: TokenType
};