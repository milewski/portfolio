import { sortAlphaNumeric } from "../Helpers";

const PhotoSwipe = require('photoswipe');
const PhotoSwipeUI = require('photoswipe/dist/photoswipe-ui-default');

export class Gallery {

    private portfolio = document.querySelector('.portfolio');
    private container = document.querySelector('.pswp') as HTMLDivElement;
    private cache = {};
    private options = {
        index: 0,
        tapToClose: true,
        closeOnScroll: false,
        modal: false,
        closeOnVerticalDrag: false,
        shareButtons: [
            { id: 'download', label: 'Download Image', url: '{{ raw_image_url }}', download: true }
        ]
    };

    private resources = [
        { collection: require('../../images/pdf/magazine-inspire.pdf') },
        { collection: require('../../images/pdf/catalogue-faber-castell.pdf') },
        { src: require('../../images/portfolio/festup-poster.jpg'), w: 900, h: 1273 },
        { src: require('../../images/portfolio/colgate.jpg'), w: 900, h: 1200 },
        { collection: require('../../images/pdf/book-instintos-crueis.pdf') },
        { collection: require('../../images/pdf/book-present-at-the-creation.pdf') },
        { collection: require('../../images/pdf/book-frost-bite.pdf') },
        { collection: require('../../images/pdf/manual-english-kids.pdf') },
        { collection: require('../../images/pdf/manual-trip-airlines.pdf') },
        { collection: require('../../images/pdf/packing-cha-leao.pdf') },
        { collection: require('../../images/pdf/packing-chocolate-nestle.pdf') },
        { collection: require('../../images/pdf/packing-sabonete-natura.pdf') },
        { collection: require('../../images/pdf/packing-ferrero-rocher.pdf') },
        { collection: require('../../images/pdf/packing-maxton.pdf') }
    ];

    constructor() {

        this.portfolio.addEventListener('click', ({ target }: MouseEvent) => {

            const gallery = new PhotoSwipe(
                this.container, PhotoSwipeUI, this.resources, this.options
            );

            gallery.listen('initialZoomIn', () => document.body.classList.add('--no-scroll'));
            gallery.listen('close', () => document.body.classList.remove('--no-scroll'));

            gallery.listen('gettingData', (index, item) => {

                if (item.collection && !this.cache[index]) {
                    item.html = this.cache[index] = this.buildPages(item.collection);
                }

            });

            if (target instanceof HTMLLIElement) {
                gallery.options.index = this.getIndex(target)
                gallery.init();
            }

        }, false)

    }

    private getIndex = node => {
        return [].map.call(this.portfolio.children, (item, i) => (item === node ) ? i : 0).reduce((a, b) => a + b)
    }

    private buildPages(images: string[]): HTMLDivElement {

        const container = document.createElement('div');

        container.classList.add('portfolio-gallery')

        if (images.length === 1)
            container.classList.add('--single')

        for (let image of images.sort(sortAlphaNumeric)) {

            const page = document.createElement('img')
            page.src = image;

            container.appendChild(page)

        }

        return container

    }

}
