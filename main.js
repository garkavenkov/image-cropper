function makeResizableDiv(div, parent) {
  const cropper = document.querySelector(div);
  const imageZone = document.querySelector(parent);
    
  const resizers = document.querySelectorAll('.corner, .side')
  const minimum_size = 20;
    
  let cropperWidth = 0;
  let cropperHeight = 0;
  let cropperLeft = 0;
  let cropperTop = 0;
  let cropperBottom = 0;
  let cropperRight = 0;
    
  let mouseX = 0;
  let mouseY = 0;   
    
  let parentTop = imageZone.getBoundingClientRect().top;
  let parentLeft = imageZone.getBoundingClientRect().left;
  let parentHeight = imageZone.getBoundingClientRect().height;
  let parentWidht = imageZone.getBoundingClientRect().width;
  // let parentBottom = parentHeight + parentTop;
  // let parentRight = parentLeft + parentWidht;
    
  function cropperInfo() {      
    cropperWidth  = cropper.getBoundingClientRect().width;
    cropperHeight = cropper.getBoundingClientRect().height;
    cropperLeft = parseFloat(getComputedStyle(cropper, null).getPropertyValue('left').replace('px', ''));
    cropperTop = parseFloat(getComputedStyle(cropper, null).getPropertyValue('top').replace('px', ''));
    // cropperLeft   = cropper.getBoundingClientRect().left;
    // cropperTop    = cropper.getBoundingClientRect().top;
    cropperRight  = cropperLeft + cropperWidth;
    cropperBottom = cropperTop + cropperHeight;            
  }

  let resizers_cnt = resizers.length;
  for (let i = 0;i < resizers_cnt; i++) {
    const currentResizer = resizers[i];

    currentResizer.addEventListener('mousedown', function(e) {       
      e.stopPropagation();              
      e.preventDefault();
      cropperInfo();        
      mouseX = e.pageX;
      mouseY = e.pageY;                
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);        
    });     
    
      
    function resize(e) { 
      e.preventDefault();
      e.stopPropagation();        
        
      let mouseDx = e.pageX - mouseX;
      let mouseDy = e.pageY - mouseY;
        
      if (currentResizer.classList.contains('bottom-right')) {
        const newWidth = cropperWidth + mouseDx;
        const newHeight = cropperHeight + mouseDy;          
        // X
        if ( newWidth > minimum_size && ( newWidth + cropperLeft)  < parentWidht/*parentRight*/ ) {
          cropper.style.width = newWidth + 'px'
        }
        // Y
        if ( newHeight > minimum_size && (newHeight + cropperTop) < parentHeight/*parentBottom*/) {
          cropper.style.height = newHeight + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const newWidth = cropperWidth - mouseDx;
        const newHeight = cropperHeight + mouseDy;
        const newCropperLeft = cropperLeft + mouseDx;                    
        // X
        if ( newWidth > minimum_size && newCropperLeft > 0 /*parentLeft*/  ) {
          cropper.style.width = newWidth + 'px'
          cropper.style.left = newCropperLeft + 'px'
        }
        // Y
        if ( newHeight > minimum_size && (cropperTop + newHeight) < parentHeight/*parentBottom*/ ) {
          cropper.style.height = newHeight + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const newWidth = cropperWidth + mouseDx;
        const newHeight = cropperHeight - mouseDy;
        const newCropperTop = cropperTop + mouseDy          
        // X
        if (newWidth > minimum_size  && ( newWidth + cropperLeft)  < parentWidht/*parentRight*/ ) {
          cropper.style.width = newWidth + 'px'
        }
        // Y
        if (newHeight > minimum_size && newCropperTop > 0/*parentTop*/ ) {
          cropper.style.height = newHeight + 'px'
          cropper.style.top = newCropperTop + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-left')) {
        const newWidth = cropperWidth - mouseDx;
        const newHeight = cropperHeight - mouseDy;
        const newCropperLeft = cropperLeft + mouseDx;
        const newCropperTop = cropperTop + mouseDy
        // X
        if (newWidth > minimum_size && newCropperLeft > 0 /*parentLeft*/) {
          cropper.style.width = newWidth + 'px'
          cropper.style.left = newCropperLeft + 'px'
        }
        // Y
        if (newHeight > minimum_size && newCropperTop > 0/*parentTop*/) {
          cropper.style.height = newHeight + 'px'
          cropper.style.top = newCropperTop + 'px'
        }
      }
      else if (currentResizer.classList.contains('top')) {
        const newHeight = cropperHeight - mouseDy;
        const newCropperTop = cropperTop + mouseDy;
        
        if (newHeight > minimum_size && newCropperTop > 0/*parentTop*/ ) {
          cropper.style.height = newHeight + 'px'
          cropper.style.top = newCropperTop + 'px'            
        }
      }
      else if (currentResizer.classList.contains('bottom')) {
        const newHeight = cropperHeight + mouseDy;
        const newCropperBottom = cropperTop + newHeight;
        
        if (newHeight > minimum_size && newCropperBottom < parentHeight/*parentBottom*/) {
          cropper.style.height = newHeight + 'px'          
        }
      }
      else if (currentResizer.classList.contains('left')) {          
        const newWidth = cropperWidth - mouseDx;
        const newCropperLeft = cropperLeft + mouseDx;        
        
        if (newWidth > minimum_size && newCropperLeft > 0/*parentLeft*/) {
          cropper.style.width = newWidth + 'px'
          cropper.style.left = newCropperLeft + 'px'
        }        
      }
      else if (currentResizer.classList.contains('right')) {          
        const newWidth = cropperWidth + mouseDx;
        const newCropperRight = cropperLeft + newWidth;
        if ( newWidth > minimum_size && newCropperRight < parentWidht) {
          cropper.style.width = newWidth + 'px'            
        }
      }
      // cropperInfo();
    }
      
    function stopResize() {
      cropperInfo();
      document.removeEventListener('mousemove', resize);        
    }
  
  }   
   
    
  function move(e) {    
    e.stopPropagation();
    if (e.target.classList.contains('resizable-area')) {              
      let mouseDx = e.pageX - mouseX;
      let mouseDy = e.pageY - mouseY;
      const left = cropperLeft + mouseDx;
      const top = cropperTop + mouseDy;      
      const right = left + cropperWidth;
      const bottom = top + cropperHeight;              
      if (left > 0/*parentLeft*/ && right < parentWidht/*parentRight*/) {
        cropper.style.left = left + 'px'
      }      
      if (top > 0/*parentTop*/ && bottom < parentHeight/*parentBottom*/) {
        cropper.style.top = top + 'px'
      }      
    }
  }

  function stopMoving(e) {
    cropperInfo();
    document.removeEventListener('mousemove', move);
  }

  cropper.addEventListener("mousedown", function(e) {
    e.stopPropagation();    
    e.preventDefault()
    cropperInfo();    
    mouseX = e.pageX;
    mouseY = e.pageY;                
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', stopMoving)      
  });   

}
  

const img = document.querySelector("#image");
let scale = 1;

img.addEventListener("wheel", (e) => {
  e.preventDefault();
  e.stopPropagation();
  // console.log(e);
  
  let delta = e.deltaY;
  if (delta < 0) {
    // console.log('scale up')
    scale = ((scale * 1) + 0.1).toFixed(1);
    console.log(`scale: ${scale}`);
  } else {
    scale = ((scale *1) - 0.1).toFixed(1);
    console.log(`scale: ${scale}`);
    if (scale <= 0) {
      scale = 0.1;
    }
  }
  img.style.scale = scale;

});

let imageMouseX = 0;
let imageMouseY = 0;
let translateX = 0;
let translateY = 0;

img.addEventListener("mousedown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log(e);
  // Middle button or wheel
  if (e.button == 1) {
    scale = 1;
    img.style.scale = 1;
    img.style.transform = 'translate(0,0)';
  }  
  /*
  // right button
  else if (e.button = 2) {
    // show prepared popup menu
    // 
  }
  */
  else {
    imageMouseX = e.pageX;
    imageMouseY = e.pageY;

    document.addEventListener('mousemove', imageMove)
    document.addEventListener('mouseup', imageStopMoving)    
    transform = getComputedStyle(img, null).getPropertyValue('transform');//.replace('px', ''));
    var matrix = new WebKitCSSMatrix(transform);
    translateX = matrix.m41;
    translateY = matrix.m42;
  }
});

function imageMove(e) {
  let mouseDx = e.pageX - imageMouseX;
  let mouseDy = e.pageY - imageMouseY;
  console.log(`mouseDx: ${mouseDx}; mouseDy: ${mouseDy}`);
  // transform = getComputedStyle(img, null).getPropertyValue('transform');//.replace('px', ''));
  // var matrix = new WebKitCSSMatrix(transform);
  // console.log(matrix);
  // let translateX = matrix.m41;
  // let translateY = matrix.m42;
  // let translateX = 0; //matrix.m41;
  // let translateY = 0; //matrix.m42;
  // console.log('translateX: ', matrix.m41 + mouseDx, ' translateY: ', matrix.m42 + mouseDy);
  // cropperTop = parseFloat(getComputedStyle(cropper, null).getPropertyValue('top').replace('px', ''));
  img.style.transform = `translate(${translateX+mouseDx}px, ${translateY+mouseDy}px)`;
}

function imageStopMoving(e) {  
  e.preventDefault();
  e.stopPropagation();
  document.removeEventListener('mousemove', imageMove);
} 

let saveBtn = document.querySelector('button#save');

saveBtn.addEventListener('click', function() {
  let cropper = document.querySelector('#cropper');
  let src = document.querySelector('#image');

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  console.log(cropper.getBoundingClientRect());   
  // console.log(src);
  console.log(`NaturalWidth: ${src.naturalWidth}; NaturalHeight: ${src.naturalHeight}; offsetWidth: ${src.offsetWidth}; offsetHeight: ${src.offsetHeight}`);
  // console.log(`TranslateX: ${translateX}; TranslateY: ${translateY}`);
  
  // const width = src.offsetWidth;
  // const height = src.offsetHeight;
  let width = cropper.getBoundingClientRect().width;
  let height = cropper.getBoundingClientRect().height;
  x = parseFloat(getComputedStyle(cropper, null).getPropertyValue('left').replace('px', ''));
  y = parseFloat(getComputedStyle(cropper, null).getPropertyValue('top').replace('px', ''));
  // let x = cropper.getBoundingClientRect().x;
  // let y = cropper.getBoundingClientRect().y;
  canvas.width = width;
  canvas.height = height;
  transform = getComputedStyle(img, null).getPropertyValue('transform');//.replace('px', ''));
  var matrix = new WebKitCSSMatrix(transform);
  translateX = matrix.m41;
  translateY = matrix.m42;
  
  console.log(`X: ${x}; Y: ${y}; TranslateX: ${translateX}; TranslateY: ${translateY}`);
  // return;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(src, x-translateX, y-translateY, width/scale, height/scale, 0, 0, width, height);
  // const imgData = ctx.getImageData(0, 0, 200, 200);
  // ctx.putImageData(imgData, 0,0);
  const newImg = new Image();
  newImg.src = canvas.toDataURL();
  document.body.appendChild(newImg);
  
});


makeResizableDiv('.resizable-area', '#image-zone');