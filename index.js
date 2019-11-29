const imageResizeCanvas = document.createElement('CANVAS');
const imageResizeCtx = imageResizeCanvas.getContext('2d');
let imagePixels = [];
// _function是給user調用的接口，開發者自己使用的function命名不需要底線

function _setImage(img) {
    /**
     * @param { HTMLImageElement } img
     */
    imageResizeCanvas.width = img.width;
    imageResizeCanvas.height = img.height;
    imageResizeCtx.drawImage(img, 0, 0);
    const { width, height } = imageResizeCanvas;
    const { data } = imageResizeCtx.getImageData(0, 0, width, height);

    imagePixels = new Array(imageResizeCanvas.height);
    for (let i = 0; i < imageResizeCanvas.height; i += 1) {
        imagePixels[i] = new Uint8ClampedArray(imageResizeCanvas.width * 4);
        for (let j = 0; j < imageResizeCanvas.width * 4; j += 4) {
            imagePixels[i][j] = data[i * imageResizeCanvas.width * 4 + j];
            imagePixels[i][j + 1] = data[i * imageResizeCanvas.width * 4 + j + 1];
            imagePixels[i][j + 2] = data[i * imageResizeCanvas.width * 4 + j + 2];
            imagePixels[i][j + 3] = data[i * imageResizeCanvas.width * 4 + j + 3];
        }
    }
}

function _getImageSrc() {
    const { width, height } = imageResizeCanvas;
    const imageData = imageResizeCtx.getImageData(0, 0, width, height);

    for (let i = 0; i < imageResizeCanvas.height; i += 1) {
        for (let j = 0; j < imageResizeCanvas.width * 4; j += 4) {
            imageData.data[i * imageResizeCanvas.width * 4 + j] = imagePixels[i][j];
            imageData.data[i * imageResizeCanvas.width * 4 + j + 1] = imagePixels[i][j + 1];
            imageData.data[i * imageResizeCanvas.width * 4 + j + 2] = imagePixels[i][j + 2];
            imageData.data[i * imageResizeCanvas.width * 4 + j + 3] = imagePixels[i][j + 3];
        }
    }

    imageResizeCtx.putImageData(imageData, 0, 0);
    return imageResizeCanvas.toDataURL();
}

window.onload = () => {
    const oImg = document.getElementById('img');
    _setImage(oImg);
    oImg.src = _getImageSrc();
    console.log('sdoakfodkoadskcoakocasodckasodkfoaskosakfoadskfoasdkfo');
};
