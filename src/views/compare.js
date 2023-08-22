import _ from 'lodash';
import { fetchPlayerRecords, fetchGlobalRecords, fetchMetaRecords } from '../scripts/api';

function HSVtoRGB(h, s, v) {
  let r; let g; let b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: { r = v; g = t; b = p; break; }
    case 1: { r = q; g = v; b = p; break; }
    case 2: { r = p; g = v; b = t; break; }
    case 3: { r = p; g = q; b = v; break; }
    case 4: { r = t; g = p; b = v; break; }
    case 5: { r = v; g = p; b = q; break; }
    default: { r = v; g = p; b = q; break; }
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function RGBtoHSV(r, g, b) {
  const max = Math.max(r, g, b); const min = Math.min(r, g, b);
  const d = max - min;
  let h;
  const s = (max === 0 ? 0 : d / max);
  const v = max / 255;

  switch (max) {
    case min: h = 0; break;
    case r: h = (g - b) + d * (g < b ? 6 : 0); h /= 6 * d; break;
    case g: h = (b - r) + d * 2; h /= 6 * d; break;
    case b: h = (r - g) + d * 4; h /= 6 * d; break;
    default: h = (r - g) + d * 4; h /= 6 * d; break;
  }

  return {
    h,
    s,
    v,
  };
}

export default {
  name: 'CompareView',
  data: () => ({
    hasLoaded: false,
    player: null,
    otherPlayer: null,
    playerRecords: null,
    comparator: null,
  }),
  props: ['playerId', 'mode', 'compareId'],
  methods: {
    async fetchRecords(func, options = null) {
      const playerRecords = await func(options);
      return {
        player: playerRecords?.player,
        records: {
          pure: playerRecords.pure.reduce((obj, item) => {
            // eslint-disable-next-line no-param-reassign
            obj[item.towerId] = item;
            return obj;
          }, {}),
          impure: playerRecords.impure.reduce((obj, item) => {
            // eslint-disable-next-line no-param-reassign
            obj[item.towerId] = item;
            return obj;
          }, {}),
        },
      };
    },
    gradient(diff) {
      let color;
      let compare;
      if (diff >= 0) {
        compare = this.max;
        color = { r: 64, g: 224, b: 16 };
      } else {
        compare = this.min;
        color = { r: 224, g: 32, b: 32 };
      }
      const interpolfunc = Math.abs(compare) > 6 ? this.logInterpolate : this.interpolate;
      const scalar = interpolfunc(diff, compare);
      const hsv = RGBtoHSV(color.r, color.g, color.b);
      const scaledHSV = { h: hsv.h, s: scalar * hsv.s, v: 0.25 + (hsv.v - 0.25) * scalar };
      const rgb = HSVtoRGB(scaledHSV.h, scaledHSV.s, scaledHSV.v);
      return { background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` };
    },
    interpolate(val, max) {
      if (!max) return 1;
      return Math.abs(val) / Math.abs(max);
    },
    logInterpolate(val, max) {
      if (!max) return 1;
      if (!val) return 0;
      return this.interpolate(Math.log(Math.abs(val) + 1), Math.log(Math.abs(max) + 1));
    },
    async updateRecords() {
      let records = await this.fetchRecords(fetchPlayerRecords, this.playerId);
      this.player = records.player;
      this.playerRecords = records.records;
      switch (this.mode) {
        case 'player':
          records = await this.fetchRecords(fetchPlayerRecords, this.compareId);
          this.otherPlayer = records.player;
          this.comparator = records.records;
          break;
        case 'sunstones':
          records = await this.fetchRecords(fetchMetaRecords, this.compareId);
          this.comparator = records.records;
          break;
        case 'meta':
          records = await this.fetchRecords(fetchMetaRecords, this.player.sunstones);
          this.comparator = records.records;
          break;
        case 'records':
        default:
          records = await this.fetchRecords(fetchGlobalRecords);
          this.comparator = records.records;
          break;
      }
      this.hasLoaded = true;
    },
  },
  async created() {
    await this.updateRecords();
  },
  computed: {
    towers() {
      return _.map(this.$store.state.towerOrder, (id) => this.$store.state.towers?.[id]);
    },
    diffs() {
      return this.towers.reduce((a, v) => ({
        ...a,
        [v.id]: {
          pure: (this.playerRecords?.pure?.[v.id]?.sunstones || 0) - (this.comparator?.pure?.[v.id]?.sunstones || 0),
          impure: (this.playerRecords?.impure?.[v.id]?.impureSunstones || 0) - (this.comparator?.impure?.[v.id]?.impureSunstones || 0),
        },
      }), {});
    },
    min() {
      return Math.min(..._.map(this.diffs, (tower) => Math.min(tower.pure, tower.impure)));
    },
    max() {
      return Math.max(..._.map(this.diffs, (tower) => Math.max(tower.pure, tower.impure)));
    },
  },
  watch: {
    async mode() {
      this.hasLoaded = false; await this.updateRecords();
    },
    async compareId() {
      this.hasLoaded = false; await this.updateRecords();
    },
  },
};
