import { mapGetters } from 'vuex';
export default {  
  computed: {
    dropdownOpened() {
      return this.$store.getters.dropdownOpened;
    },
    classObject() {
      return {
        'hamburger--squeeze': this.dropdownOpened,
        'is-active': this.dropdownOpened
      }
    }
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch('setDropDownState', !this.dropdownOpened);
    }
  }
}
