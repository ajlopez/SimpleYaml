
var TokenType = { Indent: 1, Name: 2 };

function Lexer(text) {
    var position = 0;
    var length = text ? text.length : 0;
    var lastindent = false;
    
    this.nextToken = function() {
        if (position >= length)
            return null;
            
        if (position === 0 && !lastindent)
            return nextIndent();

        position = length;
            
        return { value: text, type: TokenType.Name };
    };
    
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

module.exports = {
    createLexer: createLexer,
    TokenType: TokenType
};