<!--suppress ALL -->
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Upload Images to Server</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
    integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">

  <style>
    body {
      background: darkturquoise;
    }
  </style>
</head>

<body>

  <div class="container">
    <div class="card border-success mt-5">
      <h1 class="card-header">Upload Image</h1>
      <div class="card-body">
        <div class="form-group">
          <input class="form-control-file" type="file" accept="image/png, image/jpeg, image/BMP" id="imageInput">
          <input class="btn mt-3" type="submit" value="upload" onclick="readFile()">
        </div>
        <div id="result_view" />
      </div>
    </div>
    
    <canvas id="canvas"></canvas>
  </div>
  </div>
  <script>
    function readFile() {
      if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        alert('The File APIs are not fully supported in this browser.');
        return;
      }
      const input = document.getElementById('imageInput');
      if (!input) {
        alert("Um, couldn't find the fileinput element.");
      } else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
      } else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
      } else {
        const file = input.files[0];
        console.log(file)
        const formData = new FormData();
        formData.append('photo', file);
        fetch(window.location.pathname + 'predict', {
          method: 'POST',
          body: formData,
        }).then(response => response.json()).then(res => {
          console.log(res)
          document.getElementById('result_view').innerHTML = res.predictions.map((predict, i) =>
            `Label: ${predict.label}, prob: ${predict.probabilities.toFixed(2)}, box: (${predict.box[0].toFixed(2)}, ${predict.box[1].toFixed(2)}), (${predict.box[2].toFixed(2)}, ${predict.box[3].toFixed(2)})`
          ).join("<br />");
          console.log(res.url)

          const canvas = document.getElementById('canvas')
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const FR = new FileReader();
          FR.onload = function (e) {
            var img = new Image();
            img.addEventListener("load", function () {
              canvas.width = this.width;
              canvas.height = this.height;
              ctx.drawImage(img, 0, 0, this.width, this.height);
              console.log(res.predictions);
              for (let n = 0; n < res.predictions.length; n++) {
                const predict = res.predictions[n]
                if (predict.probabilities > 0.5) {
                  const p = document.createElement("p");
                  p.innerText = predict.label + ": " + Math.round(parseFloat(predict.probabilities) * 100) + "%";
                  let bboxLeft = predict.box[0] * this.width;
                  let bboxTop = predict.box[1] * this.height;
                  let bboxWidth = predict.box[2] * this.width; - bboxLeft;
                  let bboxHeight = predict.box[3] * this.height - bboxTop;
                  ctx.beginPath();
                  ctx.font = "28px Arial";
                  ctx.fillStyle = "red";
                  ctx.fillText(predict.label + ": " + Math.round(parseFloat(predict.probabilities) * 100) + "%", bboxLeft, bboxTop);
                  ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
                  ctx.strokeStyle = "#FF0000";
                  ctx.lineWidth = 3;
                  ctx.stroke();
                }
              }
            });
            img.src = res.url;
          };
          FR.readAsDataURL(file);
        }
        );
      }

    }
  </script>
</body>

</html>