<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <img src="https://vattuphu3ds.com/userfiles/bulong-740x431.jpg">
            </div>
            <div class="col-md-4">
              <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
              </label>
                <button v-on:click="submitFile()">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'vue-detect',
  data() {
    return {
      file: '',
      result: ''
    }
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    submitFile(){
      console.log(22222);
      let formData = new FormData();
      formData.append('file', this.file);
      let url = ''
      axios.post(url, formData,{headers: {'Content-Type': 'multipart/form-data'}})
      .then(response => {
        this.result = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
}
</script>
