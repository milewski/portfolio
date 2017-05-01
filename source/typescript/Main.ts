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

const buildIFrame = function (images: any[]) {
    const style = `<style>.portfolio-gallery { display: flex; flex-direction: column; margin: 1em; }.portfolio-gallery img { width: 100%; }</style>`
    let source = '';

    for (let image of images){
        source += `<img src="${image}">`
    }

    return `<div style="padding-right:1em; height:100%; width:100%">
                <iframe width="100%" height="100%" srcdoc='${source}'></iframe>
            </div>`
}

const size = { w: 2206, h: 1241 },
    items = [
        {
            html: buildIFrame(
                require('../images/pdf/catalogue-faber-castell.pdf')
            ),
            pid: 'inspire-magazine'
        },
        {
            src: require('../images/portfolio/festup-poster.jpg'),
            w: 900,
            h: 1273,
            pid: 'festup'
        },
        {
            src: require('../images/portfolio/colgate.jpg'),
            w: 900,
            h: 1200
        },
        // { html: buildIFrame(require('../images/pdf/book-instintos-crueis.pdf')) },
        // { html: buildIFrame(require('../images/pdf/book-present-at-the-creation.pdf')) },
        // { html: buildIFrame(require('../images/pdf/book-frost-bite.pdf')) },
        // { html: buildIFrame(require('../images/pdf/magazine-inspire.pdf')) },
        // { html: buildIFrame(require('../images/pdf/manual-english-kids.pdf')) },
        // { html: buildIFrame(require('../images/pdf/manual-trip-airlines.pdf')) },
        // { html: buildIFrame(require('../images/pdf/packing-cha-leao.pdf')) },
        // { html: buildIFrame(require('../images/pdf/packing-chocolate-nestle.pdf')) },
        // { html: buildIFrame(require('../images/pdf/packing-sabonete-natura.pdf')) },
        // { html: buildIFrame(require('../images/pdf/packing-ferrero-rocher.pdf')) },
        // { html: buildIFrame(require('../images/pdf/packing-maxton.pdf')) },
    ];

const options = {
    index: 'faber-castell',
    // pid: 'faber-castell',
    // loop: false,
    tapToClose: true,
    // closeOnScroll: false,
    // closeOnVerticalDrag: false,
    shareButtons: [
        { id: 'download', label: 'Download Image', url: '{{ raw_image_url }}', download: true }
    ],

};

const portfolio = document.querySelector('.portfolio')
const getIndex = (collection, node) => {
    return [].map.call(collection.children, (item, i) => (item === node ) ? i : 0).reduce((a, b) => a + b)
}

portfolio.addEventListener('click', ({ target }: MouseEvent) => {

    if (target instanceof HTMLLIElement) {

        options.index = getIndex(portfolio, target)

        const gallery = new PhotoSwipe(
            container, PhotoSwipeUI, items, options
        );

        // Allow to call preventDefault on down and up events
        gallery.listen('preventDragEvent', function (e, isDown, preventObj) {
            // e - original event
            // isDown - true = drag start, false = drag release

            // Line below will force e.preventDefault() on:
            // touchstart/mousedown/pointerdown events
            // as well as on:
            // touchend/mouseup/pointerup events
            console.log(e.preventDefault())
            preventObj.prevent = false;
        });


        gallery.init();

    }
}, false)


