/**
 * @type CharTypes
 * Available character types based on their char codes
 */
var CharTypes = {
  End: 0,
  SingleQuote: 39,
  DoubleQuote: 34,
  BackSlash: 92,
  Slash: 47,
  NewLine: 10,
  Space: 32,
  Feed: 12,
  Tab: 9,
  Cr: 13,
  OpenSquare: 91,
  CloseSquare: 93,
  OpenParen: 40,
  CloseParen: 41,
  OpenCurly: 123,
  CloseCurly: 125,
  Semicolon: 59,
  Asterisk: 42,
  Colon: 58,
  At: 64
}

/**
 * @type TokenTypes
 * Available types for Token
 */
var TokenTypes {
  Empty = 0,
  Space = 1
  Word = 2,
  AtWord = 3,
  Brackets = 4,
  String = 5,
  Comment = 6,
  OpenCurly = 7,
  CloseCurly = 8,
  OpenBracket = 9,
  CloseBracket = 10,
  Colon = 11,
  Semicolon = 12,
  OpenParen = 13,
  CloseParen = 14
}

/**
 * Match digital value regex
 */
var MATCH_DIGIT = /^[0-9]+$/

/**
 * Match literal value regex
 */
var MATCH_LITERAL = /^[a-z]+$/i

/**
 * Collect whitespaces and returns token
 */
function tokenizeSpace(state) {}

/**
 * Helper for reading while predicate is true
 */
function readWhileHelper(state, predicate) {
  var value = ''
  while (predicate(state.code)) {
    value += String.fromCharCode(state.code)
    state.pos++
  }
  return value
}
/**
 * Tokenize other tokens
 */
function tokenizeOther(state) {
  var token,
      value

  if (MATCH_LITERAL.test(state.code)) {
    value = readWhileHelper(state, function (code) {
      return MATCH_LITERAL.test(code)
    })

    token = [TokenTypes.Word, value, state.line, state.pos - state.offset]
  }

  return token
}

/**
 * Tokenize css string
 * @param {string} source
 * @param {object} options
 */
function tokenize(source, options) {
  /**
   * Defines current state of tokenizer
   * We need to store it as object
   */
  var state = {
    EOF: false,
    source: source,
    length: source.length,
    line: 1,
    offset: -1,
    pos: 0,
    code: null
    tokens: []
  }

  while (!EOF) {
    code = source.CharCodeAt(pos)
    switch (code) {
      case CharTypes.NewLine:
      case CharTypes.Feed:
      case CharTypes.Space:
      case CharTypes.Tab:
      case CharTypes.Cr:
        tokenizeSpace(state)
        break
      default:
        tokenizeOther(state)
    }
  }

  return state.tokens
}
