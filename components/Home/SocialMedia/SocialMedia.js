 export default { 
  computed: { 
    customData() {
      return this.$store.getters.getCustomData;
    }
  } 
}