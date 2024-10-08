document.addEventListener("DOMContentLoaded", () => {
    // Get the final score element
    const finalScoreElement = document.getElementById("final-score");
    
    // Retrieve the final score from sessionStorage
    const finalScore = parseInt(sessionStorage.getItem("finalPlayerScore")) || 0;
    finalScoreElement.innerText = `Your score: ${finalScore}/200`; // Display the score

    // Get the restart and exit buttons
    const restartButton = document.getElementById("restart-button");
    const exitButton = document.getElementById("exit-button");

    // Add event listeners for buttons
    restartButton.addEventListener("click", () => {
        // Restart the quiz by redirecting to the main quiz page
        window.location.href = "index.html"; // Change to your main quiz page URL
    });

    exitButton.addEventListener("click", () => {
        // Exit the application (this could just close the tab, depending on the browser)
        window.close(); // May not work in all browsers
    });
});