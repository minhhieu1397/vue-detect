<template>
    <div class="container-fluid">
        <div class="row">
          <div class="col-md-9 justify-conten-center cavas-content">
              <img v-if="url" :src="urlImg" hidden/>
              <canvas id="canvas1" height="700px" width="700px" class="mt-5 mb-5"></canvas>
          </div>
          <div class="col-md-3">
              <label for="upload-photo" class="btn btn-primary">Browse local files</label>
              <input type="file" id="upload-photo" ref="file" v-on:change="handleFileUpload($event)" />
              <p>File formats accepted: jpg, png, bmp</p>
              <p> File size should not exceed: 4MB</p>
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'vue-detect',
  data() {
    return {
      file: '',
      result: '',
      width: 500,
      height: 500,
      predictions: [],
      url: "https://vattuphu3ds.com/userfiles/bulong-740x431.jpg",
      urlImg: ''
    }
  },
  created() {
  },
  methods: {
    handleFileUpload(e) {
      this.file = e.target.files[0]
      this.urlImg = URL.createObjectURL(this.file);
      this.submitFile()
      
    },
    submitFile() {
      let formData = new FormData();
      formData.append('photo', this.file);
      const config = {
          headers: { 
            'content-type': 'multipart/form-data',
            'Cache-Control': 'no-cache',
          }
      }
      axios.post('http://10.1.41.26:8080/api/v1/predict', formData, config)
      .then(response => {
        console.log(response);
        this.predictions = response.data.data.predictions
        console.log(response.data.url)
        console.log(this.url)
        this.makeCanvas()
      })

    },
    makeCanvas() {
      console.log(12233);
      var canvas = document.getElementById('canvas1');
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      var img = new Image();
      canvas.width = this.width;
      canvas.height = this.height;
      img.src = this.urlImg;
      console.log(img);
      context.drawImage(img, 0, 0, this.width, this.height);
      for (let n = 0; n < this.predictions.length; n++) {
        const predict = this.predictions[n]
        if (predict.probabilities > 0.5) {
          const p = document.createElement("p");
          p.innerText = predict.label + ": " + Math.round(parseFloat(predict.probabilities) * 100) + "%";
          let bboxLeft = predict.box[0] * this.width;
          let bboxTop = predict.box[1] * this.height;
          let bboxWidth = predict.box[2] * this.width - bboxLeft;
          let bboxHeight = predict.box[3] * this.height - bboxTop;
          context.beginPath();
          context.font = "28px Arial";
          context.fillStyle = "red";
          context.fillText(predict.label + ": " + Math.round(parseFloat(predict.probabilities) * 100) + "%", bboxLeft, bboxTop);
          context.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
          context.strokeStyle = "#FF0000";
          context.lineWidth = 3;
          context.stroke();
        }
      }
    }
  }
}
</script>
<style>
label {
   cursor: pointer;
   /* Style as you please, it will become the visible UI component. */
}

#upload-photo {
   opacity: 0;
   position: absolute;
   z-index: -1;
}

.cavas-content {
  background-color: #EEEEEE !important;
}
</style>
