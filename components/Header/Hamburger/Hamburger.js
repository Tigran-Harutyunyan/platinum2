import LanguageSwitcher  from '../LanguageSwitcher/LanguageSwitcher.vue';
export default {
  data() {
    return {
      isActive: false
    }
  },
  props: ['isAuthed'],
  components: {
    LanguageSwitcher
  },
  methods: {
    perform(action) {
      switch (action) {
        case 'login': 
          this.$emit('logIn');
          break;
        case 'signUp':
          this.$emit('signUp');
          break;
        case 'logout':
          this.$emit('logout');
          break;
      }
      this.isActive = false
    },
    goTo(section) {
      let param = '';
      let customOffset = 0;
      switch (section) {
        case 'services':
          customOffset = 20;
          param = '#section-services';
          break;
        case 'about-us':
          customOffset = 30;
          param = '#section-about-us';
          break;
        case 'projects':
          customOffset = 20;
          param = '#section-portfolio';
          break;
        case 'why':
          customOffset = 20;
          param = '#reasons-section';
          break;
        case 'staff':
          param = '#staff-section';
          customOffset = 190;
          break;
        case 'contact-us':
          param = '#section-5';
          customOffset = -140;
          break;
        default:
          param = '';
      }
      this.isActive = false;

      if (this.$route.name === 'Home') {
        $('html, body').animate({
          scrollTop: !param ? 0 : $(param).offset().top - customOffset
        }, 0);
      } else {
        let params = {
          param: param,
          offset: customOffset
        }
        this.$store.dispatch('setScrollParams', params);
        this.$router.push({
          name: 'Home'
        });
      }
    }
  }
}
