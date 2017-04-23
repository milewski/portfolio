import { Orb } from './Orb';
import * as raf from 'raf';

export class Orbit {

    private canvas = document.querySelector('canvas')
    private clearer = document.querySelector('#clear')
    private context = this.canvas.getContext('2d')
    public width = window.innerWidth;
    public height = window.innerHeight;
    private onMove: ((event: MouseEvent) => void)[] = [];
    private orbs = [];

    constructor() {

        this.canvas.width = this.width
        this.canvas.height = this.height

        this.context.lineCap = 'round';

        this.canvas.addEventListener('mousedown', event => this.orbGo(event), false);
        this.canvas.addEventListener('mousedown', this.turnOnMove.bind(this), false);
        this.canvas.addEventListener('mouseup', this.turnOffMove.bind(this), false);
        this.clearer.addEventListener('click', this.clear.bind(this), false);

        window.addEventListener('resize', (e: Event) => {

            this.width = window.innerWidth
            this.height = window.innerHeight
            this.canvas.width = this.width
            this.canvas.height = this.height

            /**
             * Temporarily clear on resize
             */
            this.clear()

        }, false);

        this.loop()

    }

    public loop() {

        const context = this.context,
            width = this.width,
            height = this.height,
            orbs = this.orbs

        raf(function tick() {

            context.fillStyle = 'rgba(0,0,0,.1)';
            context.fillRect(0, 0, width, height);

            let i = orbs.length;

            while (i--) {
                const orb = orbs[i];
                let updateCount = 3;
                while (updateCount--) {
                    orb.update({ width, height });
                    orb.draw(context);
                }
            }

            raf(tick)

        })


    }

    public createOrb(x: number, y: number) {

        const dx = (this.width / 2) - x;
        const dy = (this.height / 2) - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        this.orbs.push(
            new Orb({ x, y, angle, distance, width: this.width, height: this.height })
        )

    }

    public orbGo(e: MouseEvent) {
        this.createOrb(
            e.pageX - this.canvas.offsetLeft,
            e.pageY - this.canvas.offsetTop
        );
    }

    public turnOnMove() {
        this.onMove.push(event => {
            this.orbGo(event)
        })
        this.canvas.addEventListener('mousemove', this.onMove[0], false);
    }

    public turnOffMove() {
        while (this.onMove.length) {
            this.canvas.removeEventListener('mousemove', this.onMove.pop(), false);
        }
    }

    public clear() {
        while (this.orbs.length) {
            this.orbs.pop()
        }
    }

}



