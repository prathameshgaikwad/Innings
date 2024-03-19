const subscribeToMatch = (socket, matchId) => {
  socket.join(matchId);
  console.log(`User joined match: ${matchId}`);
  // startBroadcastingRunLog(io, matchId);
};

module.exports = { subscribeToMatch };
