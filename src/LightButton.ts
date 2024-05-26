import { Watch } from './Watch';
import { ClockDisplay } from './ClockDisplay';

export class LightButton {
    private watch: Watch;

    constructor(watch: Watch) {
        this.watch = watch;
    }

    // Method to handle pressing the light button
    public press(clockDisplay: ClockDisplay) {
        this.watch.light(clockDisplay);
    }
}
