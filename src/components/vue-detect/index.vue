<template>
    <div class="container">
        <div class="row">
          <div class="col-md-8">
              <img src="https://vattuphu3ds.com/userfiles/bulong-740x431.jpg">
              <img v-if="url" :src="urlImg" />
          </div>
          <div class="col-md-4">
            <label>File
              <input type="file" id="upload-photo" ref="file" v-on:change="handleFileUpload($event)"/>
            </label>
              <button v-on:click="submitFile()" class="btn btn-success">Submit</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <canvas id="canvas1" height="700px" width="700px"></canvas>
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
      console.log(this.urlImg)
      
    },
    submitFile(){
      let formData = new FormData();
      formData.append('photo', this.file);
      const config = {
          headers: { 
            'content-type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*"
          }
      }
      axios.post('http://localhost:3000/predict', formData, config)
      .then(response => {
        console.log(response);
        this.predictions = response.data.predictions
        // this.url = response.data.url
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
            // let thickness = 1;
            // context.fillRect(bboxLeft - (thickness), bboxTop - (thickness), bboxWidth + (thickness * 2), bboxHeight + (thickness * 2));
            // context.fillRect(bboxLeft, bboxTop, bboxWidth, bboxHeight);

            context.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
            context.strokeStyle = "#FF0000";
            context.lineWidth = 3;
            context.stroke();
          }
        }
    // FR.readAsDataURL(this.file);
    }
    // makeCanvas() {
    //   var canvas = document.getElementById('canvas1');
    //   var context = canvas.getContext('2d');
    //   var base_image = new Image();
    //   base_image.src = 'https://vattuphu3ds.com/userfiles/bulong-740x431.jpg';
    //   this.width = base_image.src.clientWidth;
    //   this.height = base_image.src.clientHeight;
    //   context.drawImage(base_image, null, null, 500, 500);
    //   var rectXPos = 100;
    //   var rectYPos = 50;
    //   var rectWidth = 100;
    //   var rectHeight = 100;
    //   let thickness = 1;
    //   context.fillRect(rectXPos - (thickness), rectYPos - (thickness), rectWidth + (thickness * 2), rectHeight + (thickness * 2));
    //   context.fillRect(rectXPos, rectYPos, rectWidth, rectHeight);
    //   context.fillStyle = 'red';
    // }
  }
}
</script>
<style>
#canvas1{
  border: solid 1px black;
}
</style>
