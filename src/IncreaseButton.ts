import { Watch } from './Watch';

export class IncreaseButton {
    private watch: Watch;

    constructor(watch: Watch) {
        this.watch = watch;
    }

    public press() {
        this.watch.increase();
    }
}
