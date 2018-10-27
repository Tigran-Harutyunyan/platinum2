export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      counter: 0,
      popupImage: {},
      currentSlideIndex: '',
    }
  },
  mounted() {
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (this.index == index) {
        this.popupImage = element.image;
        this.dialogTableVisible = true;
        break;
      }
    }
  },
  methods: {
    close() {
      this.dialogTableVisible = false;
      this.$emit('close');
    },
    navigate(direction) {
      if ((this.counter == 0 && direction == -1) || (this.counter == this.items.length - 1 && direction == 1)) {
        return;
      }
      this.counter = this.counter + direction;
      if (direction === -1 && this.counter < 0) {
        this.counter = this.amount - 1;
      }
      if (direction === 1 && !this.items[this.counter]) {
        this.counter = 0;
      }
      this.popupImage = this.items[this.counter].image;
    }
  }
}
