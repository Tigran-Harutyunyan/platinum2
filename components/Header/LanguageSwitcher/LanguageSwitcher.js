import { mapGetters } from 'vuex';
export default { 
  data() {
    return {
      locales: [{
          localeName: 'ՀԱՅ',
          activeLocale: false,
          locale: 'am'
        },
        {
          localeName: 'ENG',
          activeLocale: false,
          locale: 'en'
        }
      ]
    }
  },
  computed:{
    locale(){
      return this.$store.getters.getLocale;
    }
  },
  methods: {
    toggleLang(locale) {
      this.$store.dispatch('setLocale', locale);
      location.reload(); 
    }
  },
  mounted() { 
    this.locales.forEach(item => {
      item.activeLocale = item.locale == this.locale;
    });
  }
}
