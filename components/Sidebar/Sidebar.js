export default {
  computed: {
    products() {
      return this.$store.getters.products;
    }
  }
};
