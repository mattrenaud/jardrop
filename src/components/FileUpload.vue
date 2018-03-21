<!-- FileUpload.vue -->

<!-- HTML Template -->
<template>
  <div>
    <h1>Drop a jar or zip below to view its contents.</h1>
      <div :class="['upload-wrap',{hasfiles: files.length}]">
        <form 
          enctype="multipart/form-data" 
          novalidate
          :class="['d-flex','justify-content-center','align-items-center',{dragover: dragOver}]"
          @dragover="dragOverStart"
          @dragenter="dragOverStart"          
          @dragleave="dragOverEnd"
          @dragend="dragOverEnd"
          @drop="drop"
          >
            <div class="d-flex flex-column">
              <input multiple
                id="file"
                type="file" 
                name="file" 
                @change="fileInputChange" 
                accept="application/java-archive, application/zip"
                class="input-file">
              <svg class="dropicon w-100 mb-3" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
              <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
              </svg>
              <label for="file"><strong>Choose a file</strong><span class=""> or drag it here</span>.</label>
            </div>
        </form>
        <Tree v-if="files.length" :roots="files" class="tree-root" @remove="removeFile"/>
      </div>
  </div>
</template>

<!-- Javascript -->
<script type="application/javascript">
import JSZip from "jszip";
import Vue from "vue";
import Component from "vue-class-component";
import objectPath from "object-path";

import Tree from "./Tree.vue";

const { entries } = Object;

@Component({ components: { Tree } })
export default class FileUpload extends Vue {
  dragOver = false;
  files = [];
  removeFile(file) {
    this.files = this.files.filter(f => f !== file);
  }
  stopEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  dragOverStart(e) {
    this.stopEvent(e);
    if (!this.dragOver) {
      this.dragOver = true;
    }
  }
  dragOverEnd(e) {
    this.stopEvent(e);
    this.dragOver = false;
  }
  drop(e) {
    this.stopEvent(e);
    this.dragOverEnd(e);
    const { files } = event.dataTransfer;
    this.handleFiles(files);
  }
  fileInputChange({ target: { files: selectedFiles } }) {
    return this.handleFiles(selectedFiles);
  }
  async handleFiles(selectedFiles) {
    for (const file of selectedFiles) {
      this.files = this.files.filter(f => f.name !== file.name);
      const { files: filesInZip } = await JSZip().loadAsync(file);
      this.files.unshift(this.toLeafData(file.name, filesInZip));
    }
  }
  toLeafData(fileName, filesObj) {
    const data = {
      name: fileName,
      dir: true,
      fullPath: fileName,
      children: {}
    };
    for (const [fullPath, zipObj] of entries(filesObj)) {
      const { dir } = zipObj;
      const pathParts = fullPath.split("/").filter(i => i);
      const name = pathParts.pop();
      const buryPath = pathParts
        .reduce((arr, part) => arr.concat(part, "children"), ["children"])
        .concat(name);
      objectPath.set(data, buryPath, { name, dir, zipObj, children: {} });
    }
    return data;
  }
}
</script>

<!-- SASS styling -->
<style lang="scss">
.dropbox {
  outline: 2px dashed rgba(0, 0, 0, 0.1); /* the dash box */
  outline-offset: -10px;
  background: rgba(0, 0, 0, 0.01);
  color: dimgray;
  padding: 10px 10px;
  height: 100%;
  width: 100%;
  position: relative;
  cursor: pointer;
}

.upload-wrap.hasfiles form {
  height: 140px;
}

.upload-wrap {
  position: relative;
  color: rgba(0, 0, 0, 0.7);
  svg {
    fill: rgba(0, 0, 0, 0.2);
  }
  form {
    width: 100%;
    height: 350px;
    background-color: rgba(0, 0, 0, 0.01);
    outline: 2px dashed rgba(0, 0, 0, 0.1);
    outline-offset: -10px;
    -webkit-transition: outline-offset 0.15s ease-in-out,
      background-color 0.15s linear;
    transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear,
      height 0.2s ease-in-out;
  }
  form.dragover {
    outline-offset: -20px;
    outline-color: rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }
  input[type="file"] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
  }
  label[for="file"] strong:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}

.tree-root {
  border: 1px solid rgba(96, 152, 176, 0.05);
}
</style>
