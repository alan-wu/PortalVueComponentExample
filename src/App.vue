<template>
  <div id="app">
    <div class="top-panel">
      <el-button v-if="displays.length > 0" @click="RemoveModel" class="my-button" size="small">Remove Model</el-button>
      <span class="my-button">Selected: {{selected}}</span>
      <el-button v-if="scaffoldsArray.length > 0" @click="AddModel" class="my-button" size="small">Add Model</el-button>
      <el-button v-if="csvFiles.length > 0" @click="AddData" class="my-button" size="small">Add Data</el-button>
      <el-button v-if="flatmapsArray.length > 0" @click="AddFlatmap" class="my-button" size="small">Add Flatmap</el-button>
    </div>
    
    <el-tabs :tab-position="tabPosition" style="top:10%;height: 90%;">
      <el-tab-pane v-for="item in displays" :key="item.ref" :label="item.ref" style="height:100%">
        <ScaffoldVuer v-if="item.type==='scaffold'" :url="item.url" v-on:scaffold-selected="ScaffoldSelected" :ref="item.ref" style="height:100%"/>
        <PlotVuer v-if="item.type==='plot'" :url="item.url" :name="item.ref" style="height:100%"/>
        <FlatmapVuer v-if="item.type==='flatmap'" :entry="item.entry" v-on:resource-selected="resourceSelected"  :name="item.ref" style="height:100%"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* eslint-disable no-alert, no-console */

export default {
  name: 'app',
  data: function() {
    return {
      tabPosition: 'left',
      selected: "Not Selected",
      displays: [],
      scaffoldsArray: [ {type: 'scaffold', url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/others/a3/a3_metadata.json", ref:"a3"},
                        {type: 'scaffold', url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/stellate/stellate_metadata.json", ref:"Stellate"},
                        {type: 'scaffold', url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/colon/colon_metadata.json", ref:"Colon"},
                        {type: 'scaffold', url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/use_case1/fitted_heart_metadata.json", ref:"Heart"},
                        {type: 'scaffold', url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/lungs/lungs_metadata.json", ref:"Lungs"}],
      csvFiles: [ 
        {type: 'plot', url: 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/stellate/sample_2/cell_1/18525003_channel_1.csv', ref: 'Stellate Stimulation'},
        {type: 'plot', url: 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/use-case-1/P1760+IVC+Occ+trimed.csv', ref: 'Heart ECG recording'},
        {type: 'plot', url: 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/use-case-4/RNA_Seq.csv', ref: 'RNA Sequences'}],
      flatmapsArray: [ {type: 'flatmap', entry: "NCBITaxon:10114", ref:"Rat"},
                        {type: 'flatmap', entry: "NCBITaxon:9606", ref:"Human"}]
    }
  },
  methods: {
    RemoveModel: function() {
      var currentLength = this.displays.length;
      if (currentLength > 0)
        var removed = this.displays.shift()
        if (removed.type === 'scaffold'){
          this.scaffoldsArray.unshift(removed)
        } else if (removed.type === 'plot') {
          this.csvFiles.unshift(removed)
        } else if (removed.type === 'flatmap') {
          this.flatmapsArray.unshift(removed)
        }
    },
    ScaffoldSelected: function(annotation) {
      this.selected = annotation[0].data.id;
    },
    resourceSelected: function(resource) {
      this.selected = resource.taxonomy + " " + resource.resource[0];
    },
    AddModel: function() {
      if (this.scaffoldsArray.length)
        this.displays.push(this.scaffoldsArray.shift());
    },
    AddData: function() {
      if (this.csvFiles.length)
        this.displays.push(this.csvFiles.shift());
    },
    AddFlatmap: function() {
      if (this.flatmapsArray.length)
        this.displays.push(this.flatmapsArray.shift());
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
