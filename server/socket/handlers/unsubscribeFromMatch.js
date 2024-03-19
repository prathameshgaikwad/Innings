const unsubscribeFromMatch = (socket, matchId) => {
  socket.leave(matchId);
  console.log(`User left room: ${matchId}`);
};

module.exports = { unsubscribeFromMatch };
