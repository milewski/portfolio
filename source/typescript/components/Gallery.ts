import { sortAlphaNumeric } from "../Helpers";

const PhotoSwipe = require('photoswipe');
const PhotoSwipeUI = require('photoswipe/dist/photoswipe-ui-default');

export class Gallery {

    private portfolio = document.querySelector('.portfolio');
    private container = document.querySelector('.pswp') as HTMLDivElement;
    private options = {
        shareButtons: [
            { id: 'download', label: 'Download', url: '{{ raw_image_url }}', download: true }
        ]
    };

    private resources = {
        'monster-rally': 'http://monster-rally.skysoul.com.au',
        'last-minute-table': 'http://www.lastminutetable.co.nz',
        'inspire': require('../../images/pdf/magazine-inspire.pdf?resize=2000'),
        'faber-castell': require('../../images/pdf/catalogue-faber-castell.pdf?resize=2000'),
        'instintos-crueis': require('../../images/pdf/book-instintos-crueis.pdf?resize=2000'),
        'festup': { src: require('../../images/portfolio/festup-poster.jpg'), w: 900, h: 1273 },
        'colgate': { src: require('../../images/portfolio/colgate.jpg'), w: 900, h: 1200 },
        'present-at-the-creation': require('../../images/pdf/book-present-at-the-creation.pdf?resize=2000'),
        'frost-bite': require('../../images/pdf/book-frost-bite.pdf'),
        'english-kids': require('../../images/pdf/manual-english-kids.pdf'),
        'trip-airlines': require('../../images/pdf/manual-trip-airlines.pdf?resize=1300'),
        'cha-leao': require('../../images/pdf/packing-cha-leao.pdf?resize=1500'),
        'chocolate-nestle': require('../../images/pdf/packing-chocolate-nestle.pdf?resize=1500'),
        'sabonete-natura': require('../../images/pdf/packing-sabonete-natura.pdf?resize=1500'),
        'ferrero-rocher': require('../../images/pdf/packing-ferrero-rocher.pdf?resize=2000'),
        'maxton': require('../../images/pdf/packing-maxton.pdf')
    }

    constructor() {

        this.portfolio.addEventListener('click', ({ target }: MouseEvent) => {

            if (!(target instanceof HTMLLIElement)) {
                return;
            }

            const item = (target as HTMLLIElement).getAttribute('data-id');

            let resources = this.resources[item];

            if (typeof resources === 'string') {
                return window.open(resources, '_blank')
            }

            if (resources instanceof Array) {
                resources = this.paginate(resources)
            } else {
                resources = [resources]
            }

            new PhotoSwipe(this.container, PhotoSwipeUI, resources, this.options).init();

        }, false)

    }

    private paginate(images: string[]): { src: string, w: number, h: number }[] {
        return images.sort(sortAlphaNumeric).map(src => {
            const [width, height] = new RegExp(/-(\d*x\d*)/).exec(src).pop().split('x');
            return { src, w: parseInt(width, 10), h: parseInt(height, 10) }
        })
    }

}
