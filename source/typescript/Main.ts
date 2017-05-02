import { Orbit } from "./components/Orbit";
import { Gallery } from "./components/Gallery";
import { isMobile } from "./Helpers";

const gallery = new Gallery();
const orb = new Orbit();

let count = isMobile.any() ? 30 : 10;
while (count--) {
    orb.createOrb(orb.width / (Math.random() * 3), orb.height / 3 + (count * 4));
}

console.log('%cAre you looking for the source code? -> look up here: https://github.com/milewski/portfolio?r=c', 'background: #222; color: #d2ff00; font-size: small')
