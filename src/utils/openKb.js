// src/utils/openKb.js

let isOpening = false; // Prevent multiple triggers

export const openZohoDeskKB = () => {
  if (isOpening) {
    console.log('Help Center is already opening.');
    return;
  }
  isOpening = true;
  console.log('Attempting to open Zoho Desk Help Center');

  const maxAttempts = 10; // Maximum number of attempts
  let attempts = 0;

  const interval = setInterval(() => {
    // Corrected and simplified selector
    const buttons = document.querySelectorAll('.zohodeskasapscript');

    let buttonFound = false;

    buttons.forEach((button) => {
      // Check if the button is visible
      if (button.offsetParent !== null) { // offsetParent is null if the element is hidden
        console.log('Zoho Desk widget button found. Clicking to open Help Center.');
        button.click(); // Simulate a click to open the Help Center
        buttonFound = true;
      }
    });

    if (buttonFound) {
      clearInterval(interval); // Stop checking once the button is found and clicked
      console.log('Help Center opened successfully.');
      isOpening = false;
    } else {
      attempts += 1;
      console.log(`Attempt ${attempts}: Zoho Desk widget button not found.`);
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.warn('Zoho Desk widget button not found after multiple attempts');
        isOpening = false;
      }
    }
  }, 500); // Check every 500ms
};
