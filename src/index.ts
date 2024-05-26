import { Watch } from './Watch';

// Function to run when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create a new instance of the Watch class
    const watch = new Watch();

    // Start the watch
    watch.start();

    // Set up default clock buttons
    const addClockButton = document.getElementById('add-clock-button');

    // Set up add clock button
    if (addClockButton) {
        addClockButton.addEventListener('click', () => watch.addClock());
    }
});
