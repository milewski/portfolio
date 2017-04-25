import { Orbit } from "./Orbit";
import { isMobile } from "./Helpers";

const orb = new Orbit();

let count = isMobile.any() ? 30 : 10;
while (count--) {
    orb.createOrb(orb.width / (Math.random() * 3), orb.height / 3 + (count * 4));
}
