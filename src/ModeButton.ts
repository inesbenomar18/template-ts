import { Watch } from './Watch';

export class ModeButton {
    private watch: Watch;

    constructor(watch: Watch) {
        this.watch = watch;
    }

    public press() {
        this.watch.changeMode();

    }
}
