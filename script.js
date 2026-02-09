let failedTries = 0;
const maxTries = 5;

function checkCode() {
  const input = document.getElementById("codeInput").value.toLowerCase();
  const message = document.getElementById("message");
  const video = document.getElementById("videoPlayer");

  const codes = {
    "0001": "videos/tape1.mp4",
    "0002": "videos/tape2.mp4",
    "0003": "videos/secret.mp4"
  };

  if (codes[input]) {
    // Correct code
    message.textContent = "ACCESS GRANTED";
    video.src = codes[input];
    video.hidden = false;
    video.play();
    failedTries = 0; // reset failed attempts
  } else {
    // Wrong code
    failedTries++;
    if (failedTries >= maxTries) {
      triggerLockdown(); // 5 wrong tries triggers lockdown
    } else {
      message.textContent = `ACCESS DENIED (${failedTries} failed attempt${failedTries > 1 ? 's' : ''})`;
      video.hidden = true;
      video.pause();
    }
  }
}

function triggerLockdown() {
  // Disable input and button
  document.getElementById("codeInput").disabled = true;
  document.querySelector("button").disabled = true;

  // Turn screen red
  document.body.style.backgroundColor = "darkred";
  document.body.innerHTML = `
    <h1 style="color:white; text-align:center; margin-top:20%;">UNAUTHORIZED PERSONAL</h1>
    <h2 style="color:white; text-align:center;">*SHUT DOWN PROTOCOL IN ACTION*</h2>
    <p id="countdown" style="color:white; text-align:center; font-size:20px; margin-top:20px;"></p>
  `;

  // Start countdown
  let timer = 10; // seconds
  const countdown = document.getElementById("countdown");
  countdown.textContent = `You are not part of C.F.A. please try again in ${timer} seconds`;

  const interval = setInterval(() => {
    timer--;
    countdown.textContent = `You are not part of C.F.A. please try again in ${timer} seconds`;
    if (timer <= 0) {
      clearInterval(interval);
      location.reload(); // reload page after countdown
    }
  }, 1000);
}