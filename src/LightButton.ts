import { Watch } from './Watch';

export class LightButton {
    private watch: Watch;

    constructor(watch: Watch) {
        this.watch = watch;
    }

    public press() {
        this.watch.light();
    }
}
