function _GetPixel(imagedata, x, y) {
  const position = (x + imagedata.width * y) * 4;
  const data = imagedata.data;
  return {
      r: data[position],
      g: data[position + 1],
      b: data[position + 2],
      a: data[position + 3]
  };
}

function _GetImageData(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  return context.getImageData(0, 0, image.width, image.height);
}

const graphics = {
  _GetPixel: _GetPixel,
  _GetImageData: _GetImageData
}


export default graphics;