// <template>
//     <div class="container">
//       <div class="card border-success mt-5">
//         <h1 class="card-header">Upload Image</h1>
//         <div class="card-body">
//           <div class="form-group">
//             <input class="form-control-file" type="file" id="upload-photo" ref="file" accept="image/png, image/jpeg, image/BMP" v-on:change="handleFileUpload($event)">
//             <input class="btn mt-3" type="submit" value="upload" v-on:click="submitFile()">
//           </div>
//           <div id="result_view" />
//         </div>
//       </div>
//       <canvas id="canvas"></canvas>
//     </div>
//   </div>
// </template>

// <script>
// export default {
//   name: 'vue-detect',
//   data() {
//     return {
//       file: '',
//       result: '',
//       width: 0,
//       height: 0
//     }
//   },
//   created() {
//   },
//   computed: {
//     myStyles () {
//       return {
//         height: `${this.height}px`,
//         width: `${this.width}px`,
//         predictions: 
//           [
//             {
//               "label": "SCREWS",
//               "probabilities": 0.6405991911888123,
//               "box": {
//                   "0": 0.4221368134021759,
//                   "1": 0.8825512528419495,
//                   "2": 0.45048168301582336,
//                   "3": 0.9171774387359619
//               }
//             },
//             {
//               "label": "SCREWS",
//               "probabilities": 0.5735059976577759,
//               "box": {
//                   "0": 0.4285523593425751,
//                   "1": 0.48468485474586487,
//                   "2": 0.46617162227630615,
//                   "3": 0.5155524015426636
//               }
//             },
//             {
//               "label": "SCREWS",
//               "probabilities": 0.48852381110191345,
//               "box": {
//                   "0": 0.14645244181156158,
//                   "1": 0.46128687262535095,
//                   "2": 0.285170316696167,
//                   "3": 0.5800979733467102
//               }
//             },
//             {
//               "label": "SCREWS",
//               "probabilities": 0.46599289774894714,
//               "box": {
//                   "0": 0.4618121385574341,
//                   "1": 0.3849502205848694,
//                   "2": 0.5046995878219604,
//                   "3": 0.42793115973472595
//               }
//             },
//             {
//               "label": "SCREWS",
//               "probabilities": 0.3387599289417267,
//               "box": {
//                   "0": 0.4747921824455261,
//                   "1": 0.028867533430457115,
//                   "2": 0.4994369447231293,
//                   "3": 0.05479954928159714
//               }
//             },
//             {
//               "label": "SCREWS",
//               "probabilities": 0.23964078724384308,
//               "box": {
//                   "0": 0.41625016927719116,
//                   "1": 0.9215602278709412,
//                   "2": 0.4551505446434021,
//                   "3": 0.9637893438339233
//               }
//             },
//             {
//               "label": "SCREWS",
//               "probabilities": 0.21307475864887238,
//               "box": {
//                   "0": 0.7013209462165833,
//                   "1": 0.41269752383232117,
//                   "2": 0.7528212070465088,
//                   "3": 0.4577745795249939
//               }
//             },
//             {
//               "label": "SCREWS",
//               "probabilities": 0.20442579686641693,
//               "box": {
//                   "0": 0.47442004084587097,
//                   "1": 0.49197545647621155,
//                   "2": 0.5012239813804626,
//                   "3": 0.5229191780090332
//               }
//             },
//             {
//               "label": "SCREWS",
//               "probabilities": 0.19789539277553558,
//               "box": {
//                   "0": 0.5411562323570251,
//                   "1": 0.6242108345031738,
//                   "2": 0.5747777819633484,
//                   "3": 0.6517104506492615
//               }
//             },
//             {
//               "label": "SCREWS",
//               "probabilities": 0.18631920218467712,
//               "box": {
//                   "0": 0.4219931364059448,
//                   "1": 0.3858533501625061,
//                   "2": 0.4707494080066681,
//                   "3": 0.42802858352661133
//               }
//             }
//           ],
//         url: "http://localhost:3000/1634006281812.png"
//       }
//     }
//   },
//   methods: {
//     handleFileUpload(e) {
//       this.file = e.target.files[0]
//     },
//     submitFile(){
//       let formData = new FormData();
//       formData.append('file', this.file);
//       this.makeCanvas()
//     },
//     makeCanvas() {
//       document.getElementById('result_view').innerHTML = this.predictions.map((predict) =>
//             `Label: ${predict.label}, prob: ${predict.probabilities.toFixed(2)}, box: (${predict.box[0].toFixed(2)}, ${predict.box[1].toFixed(2)}), (${predict.box[2].toFixed(2)}, ${predict.box[3].toFixed(2)})`
//           ).join("<br />");

//       const canvas = document.getElementById('canvas')
//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       const FR = new FileReader();
//       FR.onload = function () {
//             var img = new Image();
//             img.addEventListener("load", function () {
//               canvas.width = this.width;
//               canvas.height = this.height;
//               ctx.drawImage(img, 0, 0, this.width, this.height);
//               for (let n = 0; n < this.predictions.length; n++) {
//                 const predict = this.predictions[n]
//                 if (predict.probabilities > 0.5) {
//                   const p = document.createElement("p");
//                   p.innerText = predict.label + ": " + Math.round(parseFloat(predict.probabilities) * 100) + "%";
//                   let bboxLeft = predict.box[0] * this.width;
//                   let bboxTop = predict.box[1] * this.height;
//                   let bboxWidth = predict.box[2] * this.width; - bboxLeft;
//                   let bboxHeight = predict.box[3] * this.height - bboxTop;
//                   ctx.beginPath();
//                   ctx.font = "28px Arial";
//                   ctx.fillStyle = "red";
//                   ctx.fillText(predict.label + ": " + Math.round(parseFloat(predict.probabilities) * 100) + "%", bboxLeft, bboxTop);
//                   ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
//                   ctx.strokeStyle = "#FF0000";
//                   ctx.lineWidth = 3;
//                   ctx.stroke();
//                 }
//               }
//             });
//             img.src = this.url;
//           };
//           FR.readAsDataURL(this.file);
//     }
//   }
// }
// </script>
// <style>
// #canvas1{
//   border: solid 1px black;
// }
// </style>
