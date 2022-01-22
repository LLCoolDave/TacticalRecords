import { fetchProfile } from '../scripts/api';

export default {
  name: 'ProfileView',
  inject: ['$auth'],
  data: () => ({
    profile: {},
  }),
  props: ['id'],
  async created() {
    this.profile = await fetchProfile();
  },
};
