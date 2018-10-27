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
      ],
      locale:''
    }
  }, 
  methods: {
    switchLanguage(localeCode) {  
      document.cookie = `locale=${localeCode}`;
      location.reload(); 
    }
  },
  created(){
    this.locale = this.$cookiz.get('locale') ? this.$cookiz.get('locale') : 'en';

    this.$store.dispatch('setLocale', this.locale);

    this.locales.forEach(item => {
      item.activeLocale = item.locale == this.locale;
    });
  },
 
}
