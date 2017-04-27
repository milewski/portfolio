import { Orbit } from "./Orbit";
import { isMobile } from "./Helpers";

const PhotoSwipe = require('photoswipe');
const PhotoSwipeUI = require('photoswipe/dist/photoswipe-ui-default');

const orb = new Orbit();

let count = isMobile.any() ? 30 : 10;
while (count--) {
    orb.createOrb(orb.width / (Math.random() * 3), orb.height / 3 + (count * 4));
}

console.log('%cAre you looking for the source code? -> look up here: https://github.com/milewski/portfolio?r=c', 'background: #222; color: #d2ff00; font-size: small')

let container = document.querySelector('.pswp') as HTMLDivElement;

const buildIFrame = function (source: string) {
    return `<div style="padding:5em; height:100%; width:100%">
                <iframe width="100%" height="100%" src="${source}"></iframe>
            </div>`
}

const size = { w: 2206, h: 1241 },
    items = [
        {
            src: require('../images/portfolio/festup-poster.jpg'),
            msrc: require('../images/portfolio/festup-poster.jpg?resize=50%25'),
            w: 900,
            h: 1273
        },
        {
            src: require('../images/portfolio/colgate.jpg'),
            w: 900,
            h: 1200
        },
        { html: buildIFrame(require('../images/pdf/catalogue-faber-castell.pdf')) },
        { html: buildIFrame(require('../images/pdf/book-instintos-crueis.pdf')) },
        { html: buildIFrame(require('../images/pdf/book-present-at-the-creation.pdf')) },
        { html: buildIFrame(require('../images/pdf/book-frost-bite.pdf')) },
        { html: buildIFrame(require('../images/pdf/magazine-inspire.pdf')) },
        { html: buildIFrame(require('../images/pdf/manual-english-kids.pdf')) },
        { html: buildIFrame(require('../images/pdf/manual-trip-airlines.pdf')) },
        { html: buildIFrame(require('../images/pdf/packing-cha-leao.pdf')) },
        { html: buildIFrame(require('../images/pdf/packing-chocolate-nestle.pdf')) },
        { html: buildIFrame(require('../images/pdf/packing-sabonete-natura.pdf')) },
        { html: buildIFrame(require('../images/pdf/packing-ferrero-rocher.pdf')) },
        { html: buildIFrame(require('../images/pdf/packing-maxton.pdf')) },
    ];

const options = {
    index: 0,
    tapToClose: true,
    shareButtons: [
        { id: 'download', label: 'Download Image', url: '{{ raw_image_url }}', download: true }
    ],
};

const gallery = new PhotoSwipe(
    container, PhotoSwipeUI, items, options
);

gallery.init();
