/**
 * Generuje paletę barw o podanej dlugosci.
 * Jesli dane zakresu sa niepoprawne, zwracana jest dwuelementowa tablica [min, max].
 *
 * @param {string} min jedna strona zakresu
 * @param {string} max druga strona zakresu
 * @param {integer} len dlugosc palety barw
 * @author damionjestem
 */
function ColorGen(min, max, len) {
    /** paleta koncowa */
    var arr = [];
    var truLen = len -2;
    /**
     * Zamienia barwe HEX na tablice dziesietnych wartosci rgb
     * 
     * @param {string} hex barwa w szesnastkowym zapisie RRGGBB
     * @returns {Array} trójelementowa tablica barw R, G oraz B
     */
    var HexToRgb = function (hex) {
        return [parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16)];
    };

    /**
     * Zamienia barwe z trzech podanych wartosci dziesietnych na szesnastkowa
     * 
     * @param {integer} r 
     * @param {integer} g 
     * @param {integer} b
     * @returns {string} kolor HEX 
     */
    var RgbToHex = function (r, g, b) {
        red = r.toString(16);
        green = g.toString(16);
        blue = b.toString(16);

        var adjustLength = function (x) {
            if (x.length === 1) {
                return "0" + x;
            }
            else return x;
        }
        red = adjustLength(red);
        green = adjustLength(green);
        blue = adjustLength(blue);

        return red + green + blue;
    }

    /**
     * Wyznacza podzialke rownych odstepow w podanym przedziale
     * 
     * @returns {integer} dlugosc kroku
     * @param {integer} first poczatek przedzialu
     * @param {integer} last koniec przedzialu
     * @param {integer} steps ilosc krokow
     */
    var RangeDivide = function (first, last, steps) {
        return Math.floor((Math.abs(parseInt(last) - parseInt(first))) / steps);
    }

    if (min.length == 6 && max.length == 6) {

        var rMin = Math.min(HexToRgb(min)[0], HexToRgb(max)[0]);
        var gMin = Math.min(HexToRgb(min)[1], HexToRgb(max)[1]);
        var bMin = Math.min(HexToRgb(min)[2], HexToRgb(max)[2]);

        var rStep = RangeDivide(HexToRgb(min)[0], HexToRgb(max)[0], truLen);
        var gStep = RangeDivide(HexToRgb(min)[1], HexToRgb(max)[1], truLen);
        var bStep = RangeDivide(HexToRgb(min)[2], HexToRgb(max)[2], truLen);

        for (i = 0; i <= truLen; i++) {
            /** Kolor Hex zwrócony z funkcji RgbToHex */
            var colorHex = RgbToHex(rMin + (rStep * i), gMin + (gStep * i), bMin + (bStep * i));
            arr.push(colorHex);
        }
        arr.push(max);
    }
    else {
        console.log("Too short color code! It has to be 6 characters long 0-9, A-F");
        arr.push([min, max]);
    }
    return arr;
}
