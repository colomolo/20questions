const MAX_QUESTIONS_COUNT = 20

class Game {
  constructor() {
    this._players = []
    this._sockets = []

    this._word = ''
    this._questions = []

    this._winner = ''
  }

  get hasVacantSlot() {
    return this._players.length < 2
  }

  set riddler(playerId) {
    this._players[0] = playerId
  } 

  set questioner(playerId) {
    this._players[1] = playerId
  }

  get players() {
    return this._players
  }

  get sockets() {
    return this._sockets
  }

  savePlayerSocket(playerId, socket) {
    const playerIndex = this._players.indexOf(playerId)

    this._sockets[playerIndex] = socket
  }

  set word(word) {
    this._word = word
  }

  get word() {
    return this._word
  }

  set questions(questions) {
    this._questions = questions

    if (this._questions.length === MAX_QUESTIONS_COUNT && !this._winner.length) {
      this._winner = 'riddler'
    }
  }

  get questions() {
    return this._questions
  }

  set winner(winner) {
    this._winner = winner
  }

  get winner() {
    return this._winner
  }

  getPlayerRole(playerId) {
    const playerIndex = this._players.indexOf(playerId)

    if (playerIndex < 0) return undefined
    if (playerIndex === 0) return 'riddler'
    if (playerIndex === 1) return 'questioner'
  }

  get lastQuestion() {
    if (!this._questions.length) return undefined

    return this._questions.slice(-1)[0]
  }
}

module.exports = Game
