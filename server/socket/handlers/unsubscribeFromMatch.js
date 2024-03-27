const unsubscribeFromMatch = (socket, match_id) => {
  socket.leave(match_id);
  console.log(`User left room: ${match_id}`);
};

module.exports = { unsubscribeFromMatch };
