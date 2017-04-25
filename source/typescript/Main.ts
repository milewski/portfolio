import { Orbit } from "./Orbit";
import { isMobile } from "./Helpers";

const orb = new Orbit();

let count = isMobile.any() ? 30 : 10;
while (count--) {
    orb.createOrb(orb.width / (Math.random() * 3), orb.height / 3 + (count * 4));
}

setTimeout(() => {
    console.log('%cAre you looking for the source code? -> look up here: https://github.com/milewski/portfolio', 'background: #222; color: #d2ff00; font-size: small')
}, 10000)
