const PhotoSwipe = require('photoswipe');
const PhotoSwipeUI = require('photoswipe/dist/photoswipe-ui-default');

export class Gallery {

    private portfolio = document.querySelector('.portfolio');
    private container = document.querySelector('.pswp') as HTMLDivElement;
    private options = {
        index: 0,
        tapToClose: true,
        // closeOnScroll: false,
        // closeOnVerticalDrag: false,
        shareButtons: [
            { id: 'download', label: 'Download Image', url: '{{ raw_image_url }}', download: true }
        ]
    };

    private resources = [
        { collection: require('../../images/pdf/catalogue-faber-castell.pdf') },
        { src: require('../../images/portfolio/festup-poster.jpg'), w: 900, h: 1273 },
        { src: require('../../images/portfolio/colgate.jpg'), w: 900, h: 1200 },
        { collection: require('../../images/pdf/book-instintos-crueis.pdf') },
        { collection: require('../../images/pdf/book-present-at-the-creation.pdf') },
        { collection: require('../../images/pdf/book-frost-bite.pdf') },
        { collection: require('../../images/pdf/magazine-inspire.pdf') },
        { collection: require('../../images/pdf/manual-english-kids.pdf') },
        { collection: require('../../images/pdf/manual-trip-airlines.pdf') },
        { collection: require('../../images/pdf/packing-cha-leao.pdf') },
        { collection: require('../../images/pdf/packing-chocolate-nestle.pdf') },
        { collection: require('../../images/pdf/packing-sabonete-natura.pdf') },
        { collection: require('../../images/pdf/packing-ferrero-rocher.pdf') },
        { collection: require('../../images/pdf/packing-maxton.pdf') }
    ];

    constructor() {

        const gallery = new PhotoSwipe(
            this.container, PhotoSwipeUI, this.resources, this.options
        );

        gallery.listen('beforeChange', () => {

            const { iFrame, collection } = gallery.currItem;

            if (iFrame && collection) {
                this.buildIFrame(iFrame, collection)
            }

        });

        gallery.listen('gettingData', (index, item) => {

            if (item.collection) {
                item.html = (item.iFrame = item.iFrame ? item.iFrame : document.createElement('iframe'));
            }

        });

        this.portfolio.addEventListener('click', ({ target }: MouseEvent) => {

            if (target instanceof HTMLLIElement) {
                gallery.options.index = this.getIndex(target)
                gallery.init();
            }

        }, false)

    }

    private getIndex = node => {
        return [].map.call(this.portfolio.children, (item, i) => (item === node ) ? i : 0).reduce((a, b) => a + b)
    }

    private buildIFrame(iFrame: HTMLIFrameElement, images: string[]) {

        // const style = `<style>.portfolio-gallery { display: flex; flex-direction: column; margin: 1em; }.portfolio-gallery img { width: 100%; }</style>`
        // let source = '';

        const container = document.createElement('div');

        for (let image of images) {

            const page = document.createElement('img')
            page.src = image;

            container.appendChild(page)

        }

        const doc = iFrame.contentWindow.document;

        doc.open()
        doc.appendChild(container)
        doc.close()

    }

}
