<template>
  <div>
    <div class="title-container">
      <div
        v-for="view in views"
        :key="view.id"
        class="tab title"
        :class="[ { active: currentTab === view.component },view.class]"
      >
        <h1 class="page-title" @click="currentTab = view.component">
          {{view.name}}
          <span class="fw-semi-bold">Analytics</span>
        </h1>
      </div>
    </div>
    <component :is="currentTab" />
  </div>
</template>

<script>
import InternalAnal from "./InternalAnal.vue";
import StakeAnal from "./StakeAnal.vue";
export default {
  components: { InternalAnal, StakeAnal },
  data() {
    return {
       access: window.localStorage.getItem("workforceAccess"),
      currentTab: "InternalAnal",
      views: [
        {
          name: "Internal",
          component: "InternalAnal",
          class: "one"
        },
        {
          name: "Stakeholder",
          component: "StakeAnal",
          class: "two"
        }
      ]
    };
  },
  created(){
     if(this.access.includes('Internal Analytics') && this.access.includes('Stakeholder Analytics') ){
       this.currentTab = "InternalAnal";
       this.views =  [
        {
          name: "Internal",
          component: "InternalAnal",
          class: "one"
        },
        {
          name: "Stakeholder",
          component: "StakeAnal",
          class: "two"
        }
      ];
     }
     else if(this.access.includes('Internal Analytics') && !this.access.includes('Stakeholder Analytics') ){
       this.currentTab = "InternalAnal";
       this.views =  [
        {
          name: "Internal",
          component: "InternalAnal",
          class: "one"
        }
      ];
     }
          else if(!this.access.includes('Internal Analytics') && this.access.includes('Stakeholder Analytics') ){
       this.currentTab = "StakeAnal";
       this.views =  [
        {
         name: "Stakeholder",
          component: "StakeAnal",
          class: "two"
        }
      ];
     }
  },
  computed: {
    currentTabComponent() {
      return this.currentTab;
    }
  }
};
</script>

<style scoped>
.title-container {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
}
.title {
  width: 50%;
  display: flex;
  align-items: center;
}
.one {
  justify-content: flex-start;
}
.two {
  justify-content: flex-end;
}
.tab h1 {
  color: #5a5a5a;
  cursor: pointer;
  transition-duration: 0.3s;
}
.tab h1:hover {
  color: #4baeff;
  transition-duration: 0.3s;
}
.tab.active h1 {
  color: #fff;
}
</style>