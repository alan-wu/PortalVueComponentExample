<template>
  <div id="app">
    <div class="top-panel">
      <el-button v-if="displays.length > 0" @click="RemoveModel" class="my-button" size="small">Remove Model</el-button>
      <span class="my-button">Selected: {{selected}}</span>
      <el-button v-if="displays.length < 4" @click="AddModel" class="my-button" size="small">Add Model</el-button>
    </div>
    
    <el-tabs :tab-position="tabPosition" style="top:10%;height: 90%;">
      <el-tab-pane v-for="item in displays" :key="item.ref" :label="item.ref" style="height:100%">
        <ScaffoldVuer :url="item.url" v-on:scaffold-selected="ScaffoldSelected" :ref="item.ref" style="height:100%"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* eslint-disable no-alert, no-console */

var scaffoldsArray = [  {url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/others/a3/a3_metadata.json", ref:"a3"},
                        {url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/stellate/stellate_metadata.json", ref:"Stellate"},
                        {url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/colon/colon_metadata.json", ref:"Colon"},
                        {url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/use_case1/fitted_heart_metadata.json", ref:"Heart"},
                        {url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/lungs/lungs_metadata.json", ref:"Lungs"}];

export default {
  name: 'app',
  data: function() {
    return {
      tabPosition: 'left',
      selected: "Not Selected",
      displays: []
    }
  },
  methods: {
    RemoveModel: function() {
      var currentLength = this.displays.length;
      if (currentLength > 0)
        this.displays.splice(currentLength-1);
    },
    ScaffoldSelected: function(annotation) {
      this.selected = annotation[0].data.id;
    },
    AddModel: function() {
      var currentLength = this.displays.length;
      if (currentLength < 4)
        this.displays.push(scaffoldsArray[currentLength]);
    }
  }
}
</script>

<style>
body {
  margin: 0px
}

#app {
  padding:0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  width: 100%;
  position:absolute;
}
.top-panel {
  padding:1%;
  height: 4%;
}

.my-button {
  margin:5px;
}

.el-tabs__content {
  height:100%;
}
</style>
