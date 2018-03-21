
<!-- HTML Template -->
<template>
  <div>
    <div
      :class="['file-row','d-flex','align-items-center',{dir: dir, open: open}]"
      @click="toggle">
      <span :class="['d-flex','align-items-center', iconsClass,'leaf-icon']"></span>
      <span>{{ name }}</span>
    </div>
    <Leaf
      class="leaf"
      v-if="open"
      v-for="leafData in children"
      :key="leafData.name"
      :name="leafData.name"
      :dir="leafData.dir"
      :zipObj="leafData.zipObj"
      :children="leafData.children"/>
    <ContentModel
      v-if="!dir && open"
      @close="toggle"
      :name="name"
      :zipObj="zipObj">
    </ContentModel>
  </div>
</template>

<!-- Javascript -->
<script>
import Vue from "vue";
import Component from "vue-class-component";
import icon from "file-icons-js";
import ContentModel from "./ContentModel.vue";

@Component({
  components: { Leaf, ContentModel },
  props: {
    name: String,
    dir: Boolean,
    children: Object,
    zipObj: Object,
    opened: {
      type: Boolean,
      default: false
    }
  }
})
export default class Leaf extends Vue {
  open = this.opened;
  iconsClass = icon.getClassWithColor(this.name) || "default-icon";
  toggle() {
    this.open = !this.open;
  }
}
</script>

<!-- SASS styling -->
<style lang="scss">
.leaf {
  cursor: pointer;
  text-align: left;
  margin-left: 20px;
}
.bold {
  font-weight: bold;
}
.folder-closed-icon:before {
  font-family: FontAwesome;
  content: "\f07b";
}
.folder-open-icon:before {
  font-family: FontAwesome;
  content: "\f07c";
}
.leaf-icon:before {
  font-weight: normal;
  font-size: 18px;
}
.file-row > span {
  margin-right: 5px;
}
.file-row > span:first-child {
  display: block;
  width: 22px;
  margin-right: 0px;
}
.dir > .default-icon:before {
  font-family: FontAwesome;
  content: "\f07b";
  color: #6098b0;
}

.dir.open > .default-icon:before {
  content: "\f07c";
}
</style>
