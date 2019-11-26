//alert("成功引入ing-resize套件");
console.log("成功引入ing-resize套件");

let image_resize_canvas = document.createElement("CANVAS");;
let image_resize_ctx = image_resize_canvas.getContext("2d");
let canvas_Array = new Array();

function input_image(input) {
    image_resize_canvas.width = input.width;
    image_resize_canvas.height = input.height;
    image_resize_ctx.drawImage(img, 0, 0);
    let imageData = image_resize_ctx.getImageData(0, 0, image_resize_canvas.width, image_resize_canvas.height).data;
    canvas_Array = new Array(image_resize_canvas.height);
    for (var i = 0; i < image_resize_canvas.height; i++) {
        canvas_Array[i] = new Uint8ClampedArray(image_resize_canvas.width * 4);
        for (var j = 0; j < image_resize_canvas.width * 4; j += 4) {
            canvas_Array[i][j] = imageData[i * image_resize_canvas.width * 4 + j];
            canvas_Array[i][j + 1] = imageData[i * image_resize_canvas.width * 4 + j + 1];
            canvas_Array[i][j + 2] = imageData[i * image_resize_canvas.width * 4 + j + 2];
            canvas_Array[i][j + 3] = imageData[i * image_resize_canvas.width * 4 + j + 3];
        }
    }
    console.log(canvas_Array);
}

function get_image() {
    let imageData = image_resize_ctx.getImageData(0, 0, image_resize_canvas.width, image_resize_canvas.height);
    for (var i = 0; i < image_resize_canvas.height; i++) {
        for (var j = 0; j < image_resize_canvas.width * 4; j += 4) {
            imageData.data[i * image_resize_canvas.width * 4 + j] = canvas_Array[i][j];
            imageData.data[i * image_resize_canvas.width * 4 + j + 1] = canvas_Array[i][j + 1];
            imageData.data[i * image_resize_canvas.width * 4 + j + 2] = canvas_Array[i][j + 2];
            imageData.data[i * image_resize_canvas.width * 4 + j + 3] = canvas_Array[i][j + 3];
        }
    }
    image_resize_ctx.putImageData(imageData, 0, 0);
    return image_resize_canvas.toDataURL();
}

function color_inverse() {
    for (var i = 0; i < image_resize_canvas.height; i++) {
        for (var j = 0; j < image_resize_canvas.width * 4; j += 4) {
            canvas_Array[i][j] = 255 - canvas_Array[i][j];
            canvas_Array[i][j + 1] = 255 - canvas_Array[i][j + 1];
            canvas_Array[i][j + 2] = 255 - canvas_Array[i][j + 2];
        }
    }


}