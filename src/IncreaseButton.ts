import { Watch } from './Watch';
import { ClockDisplay } from './ClockDisplay';

export class IncreaseButton {
    private watch: Watch;

    constructor(watch: Watch) {
        this.watch = watch;
    }

    // Method to handle pressing the increase button
    public press(clockDisplay: ClockDisplay) {
        this.watch.increase(clockDisplay);
    }
}
