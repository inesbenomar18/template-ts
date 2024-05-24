import { Watch } from './Watch';

document.addEventListener('DOMContentLoaded', () => {

    const watch = new Watch();
    watch.start();

    // Set up default clock buttons
    const addClockButton = document.getElementById('add-clock-button');
    const defaultIncreaseButton = document.getElementById('default-increase-button');
    const defaultLightButton = document.getElementById('default-light-button');
    const defaultModeButton = document.getElementById('default-mode-button');

    if (defaultIncreaseButton) {
    defaultIncreaseButton.addEventListener('click', () => watch.increase());
    }

    if (defaultLightButton) {
        defaultLightButton.addEventListener('click', () => watch.light());
    }
    if (defaultModeButton) {
        defaultModeButton.addEventListener('click', () => watch.changeMode());
    }

    // Set up add clock button
    if (addClockButton) {
        addClockButton.addEventListener('click', () => watch.addClock());

    }
}
);
