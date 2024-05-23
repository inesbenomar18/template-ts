import { Watch } from './Watch';
import { ModeButton } from './ModeButton';
import { IncreaseButton } from './IncreaseButton';
import { LightButton } from './LightButton';

document.addEventListener('DOMContentLoaded', () => {
    const watch = new Watch();
    watch.start();

    // Initialize buttons
    const modeButton = new ModeButton(watch);
    const increaseButton = new IncreaseButton(watch);
    const lightButton = new LightButton(watch);

    // Attach event listeners
    document.getElementById('mode-button')!.addEventListener('click', () => modeButton.press());
    document.getElementById('increase-button')!.addEventListener('click', () => increaseButton.press());
    document.getElementById('light-button')!.addEventListener('click', () => lightButton.press());
});
