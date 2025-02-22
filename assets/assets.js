import idealphotologo from './IdealPhotoLogo.png';
import fullidealphotologo from './IdealPhotoLogoWithText.png';

const overlays = {};
for (let i = 1; i <= 84; i++) {
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
  Aespa: [
    overlays.overlay1, overlays.overlay7, overlays.overlay8, overlays.overlay52, overlays.overlay53,
    overlays.overlay54, overlays.overlay55, overlays.overlay56, overlays.overlay57, overlays.overlay58,
    overlays.overlay59, overlays.overlay60, overlays.overlay61, overlays.overlay62,
  ],
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

  Ive: [
    overlays.overlay63, overlays.overlay64, overlays.overlay65, overlays.overlay66,
    overlays.overlay67, overlays.overlay68, overlays.overlay79, overlays.overlay80,
    overlays.overlay81, overlays.overlay82, overlays.overlay83, overlays.overlay84,
  ],

  TXT: [
    overlays.overlay69, overlays.overlay70, overlays.overlay71, overlays.overlay72,
    overlays.overlay73, overlays.overlay74, overlays.overlay75, overlays.overlay76,
    overlays.overlay77, overlays.overlay78,
  ]

};