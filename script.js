// //Ecriture terminal
// const typed1 = new Typed('.text1', {
//     startDelay: 500,
//     loop: false,
//     strings: ['Bienvenue dans le programme Trinity.'],
//     showCursor: true,
//     cursorChar: '_',
//     typeSpeed: 30,
//     onComplete: function (self) 
//     {
//         self.cursor.remove();
//     }
// })

// const typed2 = new Typed('.text2', {
//     startDelay: 5000,
//     loop: false,
//     strings: ['Veuillez composer votre code personnel à 3 chiffres, ^500 afin d\'accéder à votre interface :^500'],
//     typeSpeed: 30,
//     showCursor: false,
//     preStringTyped: (arrayPos, self) => 
//     {
//         $('#cursor').css("display", "inline");
//     },
//     onComplete: function (self) 
//     {
//         $('#cursor').css("display", "none");
//         gsap.fromTo("#code-interface", {opacity:0}, {opacity: 1, duration:5})
//     }
// })



let count = 0;
//Ecriture du code
$('td').click(function () {
    count++;

    let numberSelected = $(this).text();
    let cursorSelected = "#number" + count; 
    $(`${cursorSelected}`).empty();
    $(`${cursorSelected}`).append(numberSelected);

    if(count == 3)
    {
        //Probleme: les instructions en jquery (empty, append...) se réalise avant que les animations de GSAP se termine
        //Solution: il faut trouver un moyen d'inclure ces instructions en animation GSAP ce qui nous permettrais de les contoller dans une timeline
        gsap.fromTo("caption", {opacity:1}, {opacity: 0, duration:3});
        $('caption').empty();
        $('caption').append(`Authentification en cours<span id="animate-character-container"><span class="animate-character1">.</span><span class="animate-character2">.</span><span class="animate-character3">.</span></span>`)

        gsap.fromTo("caption", {opacity:0}, {opacity: 1, duration:3});
        gsap.timeline()
        .fromTo(".animate-character1", {opacity:0}, {opacity: 1, duration:1})
        .fromTo(".animate-character2", {opacity:0}, {opacity: 1, duration:1})
        .fromTo(".animate-character3", {opacity:0}, {opacity: 1, duration:1})
        .fromTo("#animate-character-container", {opacity:1}, {opacity: 0, duration:1}, "-=0.7")
        .repeat(3)

        $('caption').empty();
        $('caption').append(`Acces autorisé`)

        // $('#opening-section').css("display", "none");
        // $('#defaultCanvas0').css("display", "block");
        // $('#load-section').css("display", "block");

        // // Gsap animation
        // setTimeout(() => {
        //     TweenMax.set("#defaultCanvas, #progress-bar, #progress, #state", {autoAlpha:1});

        //     gsap.timeline()
        //     .fromTo("#defaultCanvas0", {opacity:0}, {opacity: 1, duration:3})
        //     .fromTo("#progress-bar", {opacity:0}, {opacity: 1, duration:2}, "-=2")
        //     .fromTo("#progress", {opacity:0}, {opacity: 1, duration:3}, "-=1.5")
        //     .fromTo("#state", {opacity:0}, {opacity: 1, duration:3}, "-=3")

        //     gsap.timeline()
        //     .fromTo(".animate-character1", {opacity:0}, {opacity: 1, duration:1})
        //     .fromTo(".animate-character2", {opacity:0}, {opacity: 1, duration:1})
        //     .fromTo(".animate-character3", {opacity:0}, {opacity: 1, duration:1})
        //     .fromTo("#animate-character-container", {opacity:1}, {opacity: 0, duration:1}, "-=0.7")
        //     .repeat(-1)
            
        // }, 500);

        // setInterval(() => {
        //     if(loaded == false)
        //     {
        //         modifValues();
        //     }
        // }, 50);
    }
})




//Fonction glitch image
let isLoaded = false;
let glitch;
let imgSrc = 'Webp.net-resizeimage(2).png';

function setup() {
    background(0);
    createCanvas(700, 150);
    loadImage(imgSrc, function(img) {
        glitch = new Glitch(img);
        isLoaded = true;
    });
}

function draw() {
    clear();
    background(0);

    if (isLoaded) {
        glitch.show();
    }

    // fill(255, 255, 255);
    // textSize(14);
    // text('FPS: ' + floor(frameRate()), 20, 30);

}

class Glitch {
    constructor(img) {
        this.channelLen = 4;
        this.imgOrigin = img;
        this.imgOrigin.loadPixels();
        this.copyData = [];
        this.flowLineImgs = [];
        this.shiftLineImgs = [];
        this.shiftRGBs = [];
        this.scatImgs = [];
        this.throughFlag = true;
        this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

        // flow line
        for (let i = 0; i < 1; i++) {
            let o = {
                pixels: null,
                t1: floor(random(0, 1000)),
                speed: floor(random(4, 24)),
                randX: floor(random(24, 80))
            };
            this.flowLineImgs.push(o);
        }

        // shift line
        for (let i = 0; i < 6; i++) {
            let o = null;
            this.shiftLineImgs.push(o);
        }

        // shift RGB
        for (let i = 0; i < 1; i++) {
            let o = null;
            this.shiftRGBs.push(o);
        }

        // scat imgs
        for (let i = 0; i < 3; i++) {
            let scatImg = {
                img: null,
                x: 0,
                y: 0
            };
            this.scatImgs.push(scatImg);
        }
    }

    replaceData(destImg, srcPixels) {
        for (let y = 0; y < destImg.height; y++) {
            for (let x = 0; x < destImg.width; x++) {
                let r, g, b, a;
                let index;
                index = (y * destImg.width + x) * this.channelLen;
                r = index;
                g = index + 1;
                b = index + 2;
                a = index + 3;
                destImg.pixels[r] = srcPixels[r];
                destImg.pixels[g] = srcPixels[g];
                destImg.pixels[b] = srcPixels[b];
                destImg.pixels[a] = srcPixels[a];
            }
        }
        destImg.updatePixels();
    }

    flowLine(srcImg, obj) {

        let destPixels,
            tempY;
        destPixels = new Uint8ClampedArray(srcImg.pixels);
        obj.t1 %= srcImg.height;
        obj.t1 += obj.speed;
        //tempY = floor(noise(obj.t1) * srcImg.height);
        tempY = floor(obj.t1);
        for (let y = 0; y < srcImg.height; y++) {
            if (tempY === y) {
                for (let x = 0; x < srcImg.width; x++) {
                    let r, g, b, a;
                    let index;
                    index = (y * srcImg.width + x) * this.channelLen;
                    r = index;
                    g = index + 1;
                    b = index + 2;
                    a = index + 3;
                    destPixels[r] = srcImg.pixels[r] + obj.randX;
                    destPixels[g] = srcImg.pixels[g] + obj.randX;
                    destPixels[b] = srcImg.pixels[b] + obj.randX;
                    destPixels[a] = srcImg.pixels[a];
                }
            }
        }
        return destPixels;
    }

    shiftLine(srcImg) {

        let offsetX;
        let rangeMin, rangeMax;
        let destPixels;
        let rangeH;

        destPixels = new Uint8ClampedArray(srcImg.pixels);
        rangeH = srcImg.height;
        rangeMin = floor(random(0, rangeH));
        rangeMax = rangeMin + floor(random(1, rangeH - rangeMin));
        offsetX = this.channelLen * floor(random(-40, 40));

        for (let y = 0; y < srcImg.height; y++) {
            if (y > rangeMin && y < rangeMax) {
                for (let x = 0; x < srcImg.width; x++) {
                        let r, g, b, a;
                        let r2, g2, b2, a2;
                        let index;

                        index = (y * srcImg.width + x) * this.channelLen;
                        r = index;
                        g = index + 1;
                        b = index + 2;
                        a = index + 3;
                        r2 = r + offsetX;
                        g2 = g + offsetX;
                        b2 = b + offsetX;
                        destPixels[r] = srcImg.pixels[r2];
                        destPixels[g] = srcImg.pixels[g2];
                        destPixels[b] = srcImg.pixels[b2];
                        destPixels[a] = srcImg.pixels[a];
                }
            }
        }
        return destPixels;
    }

    shiftRGB(srcImg) {

        let randR, randG, randB;
        let destPixels;
        let range;

        range = 16;
        destPixels = new Uint8ClampedArray(srcImg.pixels);
        randR = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
        randG = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
        randB = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;

        for (let y = 0; y < srcImg.height; y++) {
            for (let x = 0; x < srcImg.width; x++) {
                let r, g, b, a;
                let r2, g2, b2, a2;
                let index;

                index = (y * srcImg.width + x) * this.channelLen;
                r = index;
                g = index + 1;
                b = index + 2;
                a = index + 3;
                r2 = (r + randR) % srcImg.pixels.length;
                g2 = (g + randG) % srcImg.pixels.length;
                b2 = (b + randB) % srcImg.pixels.length;
                destPixels[r] = srcImg.pixels[r2];
                destPixels[g] = srcImg.pixels[g2];
                destPixels[b] = srcImg.pixels[b2];
                destPixels[a] = srcImg.pixels[a];
            }
        }

        return destPixels;
    }

    getRandomRectImg(srcImg) {
        let startX;
        let startY;
        let rectW;
        let rectH;
        let destImg;
        startX = floor(random(0, srcImg.width - 30));
        startY = floor(random(0, srcImg.height - 50));
        rectW = floor(random(30, srcImg.width - startX));
        rectH = floor(random(1, 50));
        destImg = srcImg.get(startX, startY, rectW, rectH);
        destImg.loadPixels();
        return destImg;
    }

    show() {
      
        // restore the original state
        this.replaceData(this.imgOrigin, this.copyData);

        // sometimes pass without effect processing
        let n = floor(random(100));
        if (n > 75 && this.throughFlag) {
            this.throughFlag = false;
            setTimeout(() => {
                this.throughFlag = true;
            }, floor(random(40, 400)));
        }
        if (!this.throughFlag) {
            push();
            translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
            image(this.imgOrigin, 0, 0);
            pop();
            return;
        }

        // flow line
        this.flowLineImgs.forEach((v, i, arr) => {
            arr[i].pixels = this.flowLine(this.imgOrigin, v);
            if (arr[i].pixels) {
                this.replaceData(this.imgOrigin, arr[i].pixels);
            }
        })

        // shift line
        this.shiftLineImgs.forEach((v, i, arr) => {
            if (floor(random(100)) > 50) {
                arr[i] = this.shiftLine(this.imgOrigin);
                this.replaceData(this.imgOrigin, arr[i]);
            } else {
                if (arr[i]) {
                    this.replaceData(this.imgOrigin, arr[i]);
                }
            }
        })

        // shift rgb
        this.shiftRGBs.forEach((v, i, arr) => {
            if (floor(random(100)) > 65) {
                arr[i] = this.shiftRGB(this.imgOrigin);
                this.replaceData(this.imgOrigin, arr[i]);
            }
        })

        push();
        translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
        image(this.imgOrigin, 0, 0);
        pop();

        // scat image
        this.scatImgs.forEach((obj) => {
            push();
            translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
            if (floor(random(100)) > 80) {
                obj.x = floor(random(-this.imgOrigin.width * 0.3, this.imgOrigin.width * 0.7));
                obj.y = floor(random(-this.imgOrigin.height * 0.1, this.imgOrigin.height));
                obj.img = this.getRandomRectImg(this.imgOrigin);
            }
            if (obj.img) {
                image(obj.img, obj.x, obj.y);
            }
            pop();
        })

    }

}




//Fonction progress bar
let loaded = false;

function modifValues(){
    
    let val = $('#progress-bar').attr('value');

    if(val >= 100){
        loaded = true;
    }

    let newVal = val * 1 + 0.25;
    let txt = Math.floor(newVal)+'%';      
      
    $('#progress-bar').attr('value', newVal).text(txt);
    $('#progress').html(txt);
}