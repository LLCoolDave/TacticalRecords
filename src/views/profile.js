import { updateProfile } from '../scripts/api';

export default {
  name: 'ProfileView',
  data: () => ({
    isUpdating: false,
    modifiedName: null,
    modifiedPfp: null,
  }),
  methods: {
    async updateProfile() {
      /* ToDo there has to be a cleaner way to write this */
      this.isUpdating = true;
      const updates = {};
      if (this.modifiedName) updates.name = this.modifiedName;
      if (this.modifiedPfp != null) updates.pfp = this.modifiedPfp;
      const newProfile = await updateProfile(updates);
      if (newProfile) this.$store.commit('setProfile', newProfile);
      this.isUpdating = false;
    },
  },
  computed: {
    profile() {
      return this.$store.state.userProfile;
    },
    name: {
      get() {
        return this.modifiedName != null ? this.modifiedName : this.profile?.player?.name || '';
      },
      set(newValue) {
        if (newValue === this.profile?.player?.name) {
          this.modifiedName = null;
        } else {
          this.modifiedName = newValue;
        }
      },
    },
    pfp: {
      get() {
        return this.modifiedPfp != null ? this.modifiedPfp : this.profile?.player?.pfp || '';
      },
      set(newValue) {
        if (newValue === this.profile?.player?.pfp || '') {
          this.modifiedPfp = null;
        } else {
          this.modifiedPfp = newValue;
        }
      },
    },
    changes() {
      return this.modifiedName || this.modifiedPfp != null;
    },
    nameStyle() {
      if (this.name === '') return { background: 'lightcoral' };
      return {};
    },
  },
};
