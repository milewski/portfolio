export class Orb {

    private x: number;
    private y: number;
    private lastX: number;
    private lastY: number;
    private colorAngle: number = 0;
    private angle: number;
    private size: number = this.rand(1, 3) / 2;
    private centerX: number;
    private centerY: number;
    private radius: number;
    private speed: number;
    private alpha: number;

    constructor({ x, y, angle, distance, width, height }) {

        this.x = x
        this.y = y
        this.lastX = x
        this.lastY = y
        this.angle = angle + Math.PI / 2
        this.centerX = width / 2
        this.centerY = height / 2
        this.radius = distance
        this.speed = (this.rand(5, 10) / 1000) * (distance / 750) + .015
        this.alpha = 1 - Math.abs(distance) / width

    }

    public draw(context) {
        context.strokeStyle = `hsla(${this.colorAngle},100%,50%,1)`;
        context.lineWidth = this.size;
        context.beginPath();
        context.moveTo(this.lastX, this.lastY);
        context.lineTo(this.x, this.y);
        context.stroke();
    }

    private rand(rMi: number, rMa: number) {
        return ~~((Math.random() * (rMa - rMi + 1)) + rMi);
    }

    public update({ width, height }) {

        const { x, y } = this

        this.lastX = x;
        this.lastY = y;

        const x1 = width / 2;
        const y1 = height / 2;
        const x2 = x;
        const y2 = y;

        const rise = y1 - y2;
        const run = x1 - x2;
        const slope = -(rise / run);
        const radian = Math.atan(slope);

        let angleH = Math.floor(radian * (180 / Math.PI));

        if (x2 < x1 && y2 < y1) {
            angleH += 180;
        }
        if (x2 < x1 && y2 > y1) {
            angleH += 180;
        }
        if (x2 > x1 && y2 > y1) {
            angleH += 360;
        }
        if (x2 < x1 && slope == 0) {
            angleH = 180;
        }
        if (isNaN(angleH)) {
            angleH = 0;
        }

        this.colorAngle = angleH;

        this.x = this.centerX + Math.sin(this.angle * -1) * this.radius;
        this.y = this.centerY + Math.cos(this.angle * -1) * this.radius;

        this.angle += this.speed;

    }

}
