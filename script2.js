let imageSlider = document.querySelectorAll('.slideContain');
let prev = document.querySelectorAll('.previous');
let next = document.querySelectorAll('.next');
let counter = 0;

console.log(imageSlider);

imageSlider[0].classList.add('activeDiv');



prev[counter].addEventListener('click', () => {
     for (let i = 0; i < imageSlider.length; i++) {
        imageSlider[i].classList.remove('activeDiv');
     }
     counter--;

     if (counter < 0) {
         counter = imageSlider.length - 1;
     }

     imageSlider[counter].classList.add('activeDiv');
});