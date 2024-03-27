const subscribeToMatch = (socket, match_id) => {
  socket.join(match_id);
  console.log(`User joined match: ${match_id}`);
  // startBroadcastingRunLog(io, match_id);
};

module.exports = { subscribeToMatch };
