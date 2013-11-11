
function Lexer(text) {
    this.nextToken = function() {
        return null;
    };
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    createLexer: createLexer
};