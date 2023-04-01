let imgInput = document.getElementById('id_photo');
imgInput.addEventListener('change', function (e) {
  if (e.target.files) {
    Array.from(e.target.files).forEach(file=>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (fe) => {
        const image = new Image();
        image.src = fe.currentTarget.result;
        image.onload = function(ie){
          console.log('Width: ' + this.naturalHeight);
          console.log('Height: ' + this.naturalWidth);
        }
      }
    })
  }
});

