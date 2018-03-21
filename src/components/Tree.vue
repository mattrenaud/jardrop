
<!-- HTML Template -->
<template>
  <div>
    <div class="tree-wrap d-flex position-relative" v-for="(leafData, index) in roots" :key="index">
      <div>
        <a class='trash-icon' @click="remove(leafData)">
          <svg aria-hidden="true" data-prefix="far" width="16" data-icon="times-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-times-square fa-w-14 fa-2x">
            <path fill="currentColor" d="M325.8 193.8L263.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L224 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" class="">
            </path>
          </svg>
        </a>
      </div>
      <Leaf
        class="leaf ml-0"
        :name="leafData.name"
        :dir="leafData.dir"
        :opened="true"
        :children="leafData.children"/>
    </div>
  </div>
</template>

<!-- Javascript -->
<script>
import Vue from "vue";
import Component from "vue-class-component";

import Leaf from "./Leaf.vue";

@Component({
  components: { Leaf },
  props: {
    roots: Array
  }
})
export default class Tree extends Vue {
  remove(root) {
    this.$emit("remove", root);
  }
}
</script>

<!-- SASS styling -->
<style lang="scss">
.tree-wrap {
  padding: 10px;
}
.tree-wrap:not(:last-child) {
  border-bottom: 1px solid rgba(96, 152, 176, 0.05);
}
.tree-wrap:hover .trash-icon {
  display: block;
}
.trash-icon {
  display: none;
  opacity: 1;
  position: absolute;
  right: 10px;
  top: 12px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  svg {
    color: #6098b0;
  }
}
</style>
