import { Watch } from './Watch';
import { ClockDisplay } from './ClockDisplay';

export class ModeButton {
    private watch: Watch;

    constructor(watch: Watch) {
        this.watch = watch;
    }

    // Method to handle pressing the mode button
    public press(clockDisplay: ClockDisplay) {
        this.watch.changeMode(clockDisplay);
    }
}
