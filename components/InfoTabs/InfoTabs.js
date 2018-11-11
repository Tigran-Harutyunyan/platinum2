import Tabs from './tabs.vue';
export default {
  name: 'tabs-container',
  components: {
    'tabs': Tabs
  },
  data() {
    return {
      activeTab: 1, 
      tabs: [{
          id: 1,
          name: 'uploadSamples',
          isActive: true
        },
        {
          id: 2,
          name: 'howToUseIt',
          isActive: false
        }
      ]
    }
  },
  props: {
    links: {
      type: Array
    }
  },
  computed: {
    locale: {
      get: function () {
        return this.$store.getters.getLocale;
      },
      set: function () {}
    } 
  },
  methods: {
    onTabChange(value) {
      this.activeTab = value;
    }  
  },
 
} 