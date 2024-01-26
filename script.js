async function updateTimer() {
  const currentTime = new Date();
  const currentDay = currentTime.getDay();

  const nextDay = new Date(currentTime);
  nextDay.setDate(nextDay.getDate() + (currentDay === 6 ? 2 : 1));
  nextDay.setHours(0, 0, 0, 0);

  const timeDifference = nextDay.getTime() - currentTime.getTime();
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (hours === 0 && minutes === 0 && seconds === 0) {
    updateTimer();
  } else {
    updateTimerDisplay(hours, minutes, seconds);
  }
}

function updateTimerDisplay(hours, minutes, seconds) {
  const H1 = document.querySelectorAll(".H1");
  const H2 = document.querySelectorAll(".H2");
  const M1 = document.querySelectorAll(".M1");
  const M2 = document.querySelectorAll(".M2");
  const S1 = document.querySelectorAll(".S1");
  const S2 = document.querySelectorAll(".S2");

  H1[0].textContent = Math.floor(hours / 10);
  H2[0].textContent = hours % 10;
  M1[0].textContent = Math.floor(minutes / 10);
  M2[0].textContent = minutes % 10;
  S1[0].textContent = Math.floor(seconds / 10);
  S2[0].textContent = seconds % 10;

  H1[1].textContent = Math.floor(hours / 10);
  H2[1].textContent = hours % 10;
  M1[1].textContent = Math.floor(minutes / 10);
  M2[1].textContent = minutes % 10;
  S1[1].textContent = Math.floor(seconds / 10);
  S2[1].textContent = seconds % 10;
}

function updateSlider() {
  const slides = document.querySelectorAll(".reviews-card");
  let prev = document.querySelectorAll(".previous");
  let next = document.querySelectorAll(".next");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.opacity = 1;
      } else {
        slide.style.opacity = 0;
      }
    });
  }

  prev.forEach((button) => {
    button.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  });

  next.forEach((button) => {
    button.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  });

  showSlide(currentSlide);
}

function smoothScroll(target) {
  target.scrollIntoView({ behavior: "smooth" });
}

window.onload = function () {
  updateTimer();
  setInterval(updateTimer, 1000);

  updateSlider();

  document
    .getElementById("scrollButton")
    .addEventListener("click", function () {
      smoothScroll(document.getElementById("targetButton"));
    });

      const scriptURL = "https://script.google.com/macros/s/AKfycbx9ZyKX6eLOusj7SWF4qAqag2dxVo8HsVa8b0avYnAh85J8Y7CfeFYmQ2ZLlpBEi3_Y9Q/exec";
      const form = document.forms["submit-to-google-sheet"];
      const sendText = document.getElementById("sendText");

      form.addEventListener("submit", (e) => {
        e.preventDefault();

       
        const formData = new FormData(form);
        const username = formData.get("username");
        const userphone = formData.get("user-phone");

        
        fetch(scriptURL, { method: "POST", body: formData })
          .then((response) => {
            sendText.textContent = "Ваше замовлення прийнято!";
            form.reset();

           
            sendEmail(username, userphone);
          })
          .catch((error) => console.error("Error!", error.message));
      });

     
      function sendEmail(username, userphone) {
        let tempParams = {
         username: username,
         userphone: userphone}
         emailjs.send("service_ojf50ix","template_kqtxn9o", tempParams)
         .then(function(res){
            console.log("success", res.status);
          } )
      }
        
};
