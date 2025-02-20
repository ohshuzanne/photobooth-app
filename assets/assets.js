import idealphotologo from './IdealPhotoLogo.png';
import fullidealphotologo from './IdealPhotoLogoWithText.png';

// Dynamically import overlays
const overlays = {};
for (let i = 1; i <= 51; i++) {
  overlays[`overlay${i}`] = require(`./Overlays/Overlay${i}.png`).default;
}

export const assets = {
  idealphotologo,
  fullidealphotologo,
  ...overlays,
};

export const overlayCategories = {
  all: Object.values(overlays),
  Boynextdoor: [
    overlays.overlay2, overlays.overlay3, overlays.overlay4, overlays.overlay5, overlays.overlay6,
    overlays.overlay9, overlays.overlay10, overlays.overlay11, overlays.overlay12, overlays.overlay13,
    overlays.overlay14, overlays.overlay15, overlays.overlay16, overlays.overlay17, overlays.overlay18,
    overlays.overlay19, overlays.overlay20, overlays.overlay21, overlays.overlay22, overlays.overlay23,
    overlays.overlay24, overlays.overlay25, overlays.overlay26, overlays.overlay27,
  ],
  Aespa: [overlays.overlay1, overlays.overlay7, overlays.overlay8],
  Enhypen:[
    overlays.overlay28, overlays.overlay29, overlays.overlay30, overlays.overlay31,
    overlays.overlay32, overlays.overlay33, overlays.overlay34, overlays.overlay35,
    overlays.overlay36, overlays.overlay37, overlays.overlay38, overlays.overlay39,
    overlays.overlay40, overlays.overlay41,
  ],
  Lesserafim: [
    overlays.overlay42, overlays.overlay43, overlays.overlay44, overlays.overlay45,
    overlays.overlay46, overlays.overlay47, overlays.overlay48, overlays.overlay49,
    overlays.overlay50, overlays.overlay51,
  ],

};