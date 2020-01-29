import chatkit from '../chatkit';

// Helper function for displaying error messages
function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit('setError', message);
}

export default {
  async login({ commit, state }, userId) {
    try {
      commit('setError', '');
      commit('setLoading', true);
      // Connect user to ChatKit service
      const currentUser = await chatkit.connectUser(userId);
      commit('setUser', {
        username: currentUser.id,
        name: currentUser.name
      });
      console.log(currentUser);
      commit('setReconnect', false);
      // Save list of user's rooms in store
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name
      }))
      console.log(rooms);
      commit('setRooms', rooms);

      // Subscribe user to a room
      const activeRoom = state.activeRoom || rooms[0]; // pick last used room, or the first one
      commit('setActiveRoom', {
        id: activeRoom.id,
        name: activeRoom.name
      });
      console.log(activeRoom);
      await chatkit.subscribeToRoom(activeRoom.id);


      // Test state.user
      console.log(state.user);
      return true;
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false);
    }
  }
}
