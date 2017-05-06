export const isMobile = {
    Android: () => /Android/i.test(navigator.userAgent),
    iOS: () => /iPhone|iPad|iPod/i.test(navigator.userAgent),
    Mobile: () => /Mobi/.test(navigator.userAgent),
    any: () => {
        return (isMobile.Android() || isMobile.iOS() || isMobile.Mobile()) as boolean;
    }
};

export const sortAlphaNumeric = (a, b) => {

    const reA = /[^a-zA-Z]/g;
    const reN = /[^0-9]/g;

    const aA = a.replace(reA, '');
    const bA = b.replace(reA, '');

    if (aA === bA) {

        const aN = parseInt(a.replace(reN, ''), 10);
        const bN = parseInt(b.replace(reN, ''), 10);

        return aN === bN ? 0 : aN > bN ? 1 : -1;

    }

    return aA > bA ? 1 : -1;

}
