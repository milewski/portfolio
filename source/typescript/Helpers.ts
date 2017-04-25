export const isMobile = {
    Android: () => /Android/i.test(navigator.userAgent),
    iOS: () => /iPhone|iPad|iPod/i.test(navigator.userAgent),
    Mobile: () => /Mobi/.test(navigator.userAgent),
    any: () => {
        return (isMobile.Android() || isMobile.iOS() || isMobile.Mobile()) as boolean;
    }
};
