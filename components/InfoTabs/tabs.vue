 <template>
    <div class="tabs">
      <div class="tab-item" 
          v-for="(tab,index) in tabs" :key="index"
          :class="{'active-tab': tab.isActive }" 
          @click="selectTab(tab)"> <i></i>
          {{ $t( tab.name )}}  
      </div> 
    </div>   
 </template>
 <script>
    export default {
      name: "tabs",
      props: ["tabs"],
      methods: {
        selectTab(selectedTab) {
          this.$emit("tab-changed", selectedTab.id);
          this.tabs.forEach(tab => {
            tab.isActive = tab.id == selectedTab.id;
          });
        }
      }
    };
</script>
<style lang="scss" scoped>

.tabs {
    display: flex;
    margin: 0 auto; 
    .tab-item:nth-child(1){
        border-right: none
    }
}

.tab-item {
    color: #af995a;
    font-size: 17px;
    padding: 14px 26px;
    border: 1px solid #af995a;
    border-bottom: none;
    width: 240px;
    text-align: center;
    position: relative;
    text-transform: uppercase;
    cursor: pointer;
    i {
        display: none;
        position: absolute;
        bottom: -1px;
        width: 100%;
        border-bottom: 1px solid #fff;
        left: 0;
    }
}

.tab-item.active-tab {
    background: white;
    i {
        display: block
    }
}
</style>

 