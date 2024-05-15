const unsubscribeFromMatch = (socket, matchId) => {
  socket.leave(matchId);
  console.log(`User left match: ${matchId}`);
};

module.exports = { unsubscribeFromMatch };
