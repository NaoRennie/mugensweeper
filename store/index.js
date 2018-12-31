const USER_KEY_NAME = 'msweeP';

export const state = () => ({
  userName: null,
  userId: null,
  token: null,
});

export const plugins = [
  (store) => {
    if (process.env.NODE_ENV === 'test') return;
    const localData = localStorage.getItem(USER_KEY_NAME);
    if (localData) {
      store.commit('setAccessToken', JSON.parse(localData));
    }

    store.subscribe((mutation) => {
      if (mutation.type !== 'setAccessToken') return; // setAccessTokenの発火時のみ起動
      localStorage.setItem(USER_KEY_NAME, JSON.stringify(mutation.payload));
    });
  },
];

export const mutations = {
  setAccessToken(state, { accessToken, userId, userName }) {
    state.token = accessToken;
    state.userId = userId;
    state.userName = userName;
  },
};

export const actions = {
  async getAccessToken({ commit, state }, userName) {
    if (!state.token) {
      const userData = await this.$axios.$post('/api/routes/dev/user_id_generate', { userName });
      commit('setAccessToken', userData);
    }
  },
};
