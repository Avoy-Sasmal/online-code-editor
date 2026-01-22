const rooms = new Map();

export const getRoom = (roomId) => rooms.get(roomId);

export const createRoom = (roomId) => rooms.set(roomId, new Set());

export const addUserToRoom = (roomId, userName) => {
    if (!rooms.has(roomId)) createRoom(roomId);
    rooms.get(roomId).add(userName);
};

export const removeUserFromRoom = (roomId, userName) => {
    if (rooms.has(roomId)) rooms.get(roomId).delete(userName);
};

export const getUsersInRoom = (roomId) => Array.from(rooms.get(roomId) || []);
