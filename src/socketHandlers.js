const socketIO = require('socket.io')

const Game = require('./Game')

let games = []

const emitRole = (socket, role) => {
  socket.emit('role', role)
}

module.exports = (server) => {
  const io = socketIO(server)

  const sendEvent = ({ sockets, event, value }) => {
    io.to(sockets[0]).to(sockets[1]).emit(event, value)
  }

  const sendWord = (sockets, word) => {
    sendEvent({ sockets, event: 'getWord', value: word })
  }

  const sendQuestions = (sockets, questions) => {
    sendEvent({ sockets, event: 'questions', value: questions })
  }

  const sendWinner = (sockets, winner) => {
    sendEvent({ sockets, event: 'winner', value: winner })
  }

  const joinExistingOrCreateNewGame = (playerId, socket) => {
    const vacantGame = games.find(game => game.hasVacantSlot)

    if (vacantGame) {
      // Check if there are vacant games to join. If any, join as a questioner
      vacantGame.questioner = playerId
      vacantGame.savePlayerSocket(playerId, socket.id)

      emitRole(socket, 'questioner')
    } else {
      // There are no vacant games, so we create new and join as a riddler
      const game = new Game()

      games.push(game)
      game.riddler = playerId
      game.savePlayerSocket(playerId, socket.id)

      emitRole(socket, 'riddler')
    }
  }

  io.on('connection', (socket) => {
    socket.on('playerId', (playerId) => {
      const existingGame = games.find(game => game.players.includes(playerId))

      if (existingGame) {
        // Player is already in a game. Here we retrive his role (riddler or questioner) and reconnect
        const playerRole = existingGame.getPlayerRole(playerId)

        existingGame.savePlayerSocket(playerId, socket.id)

        emitRole(socket, playerRole)

        sendWord(existingGame.sockets, existingGame.word)
        sendQuestions(existingGame.sockets, existingGame.questions)

        if (existingGame.winner) {
          sendWinner(existingGame.sockets, existingGame.winner)
        }
      } else {
        joinExistingOrCreateNewGame(playerId, socket)
      }
    })

    socket.on('saveWord', (playerId, word) => {
      const game = games.find(game => game.players.includes(playerId))

      game.word = word
      sendWord(game.sockets, game.word)
    })

    socket.on('questions', (playerId, questions) => {
      const game = games.find(game => game.players.includes(playerId))

      game.questions = questions
      sendQuestions(game.sockets, questions)

      if (game.winner) {
        sendWinner(game.sockets, game.winner)
      }
    })
  })
}
