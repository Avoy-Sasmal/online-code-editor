const rooms = new Map();

 const getRoom = (roomId) => rooms.get(roomId);

const createRoom = (roomId) => rooms.set(roomId, new Set());

 const addUserToRoom = (roomId, userName) => {
  if (!rooms.has(roomId)) createRoom(roomId);
  rooms.get(roomId).add(userName);
};

 const removeUserFromRoom = (roomId, userName) => {
  if (rooms.has(roomId)) rooms.get(roomId).delete(userName);
};

 const getUsersInRoom = (roomId) => Array.from(rooms.get(roomId) || []);

export {getRoom, createRoom, addUserToRoom, removeUserFromRoom, getUsersInRoom};