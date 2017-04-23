import { Orbit } from "./Orbit";

const orb = new Orbit();

let count = 10;
while (count--) {
    orb.createOrb(orb.width / (Math.random() * 3), orb.height / 3 + (count * 4));
}
