// //Scroll changement de page
// function wheel(event){
//     let strings = $("body").css("transform");
//     let tab_decoup = strings.split(", ");

//     gsap.fromTo("#defaultCanvas0", {opacity:1}, {opacity:0, duration:1});

//     let animate = gsap.fromTo("#first-page", {opacity:1}, {opacity:0, duration:1});

//     animate.eventCallback("onComplete", function(){
//         $("#defaultCanvas0").css("display", "none");

//         if(tab_decoup[5] == undefined)
//         gsap.fromTo("body", {y:0}, {y:-720, duration:1, ease:"power4.in"});

//         else{
//             let position1 = tab_decoup[5].replace(")", "");
//             let position2 = position1 - 700;
           
//             gsap.fromTo("body", {y:position1}, {y:position2, duration:1, ease:"power4.in"});
//         }
//     })
// }

// if (window.addEventListener)
// {
//     window.addEventListener('DOMMouseScroll', wheel, false);
//     window.onmousewheel = document.onmousewheel = wheel;
// }




// $("#nav-bar > ul > li").mouseenter(function(){
//     let string = $(this).text();
//     console.log(string);

//     $(this).glitch({
//         chars: '!<>-_\\/[]{}—=+*^?#_',
//         charTime: 1,
//         finalText: string,
//         done:function(){
//             console.log('done!');
//         }            
//     });
// })


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



// let count = 0;
// //Ecriture du code
// $('td').click(function () {
//     count++;

//     let numberSelected = $(this).text();
//     let cursorSelected = "#number" + count; 
//     $(`${cursorSelected}`).empty();
//     $(`${cursorSelected}`).append(numberSelected);

//     if(count == 3)
//     {
//         function step1(){
//             let tl = gsap.timeline()
//                     .fromTo("#table-title", {opacity:1}, {opacity: 0, duration:1})
//                     .set("#table-title", {text: 'Authentification en cour'})
//                     .fromTo("#table-title", {opacity:0}, {opacity: 1, duration:1}, "+=1")
//                     .fromTo("#animate-character-container1", {opacity:0}, {opacity: 1}, "-=1")
//             return tl;
//         }

//         function step2(){
//             let tl = gsap.timeline()
//                     .fromTo(".animate-character1", {opacity:0}, {opacity: 1, duration:1})
//                     .fromTo(".animate-character2", {opacity:0}, {opacity: 1, duration:1})
//                     .fromTo(".animate-character3", {opacity:0}, {opacity: 1, duration:1})
//                     .fromTo("#animate-character-container1", {opacity:1}, {opacity: 0, duration:1}, "-=0.7")
//                     .repeat(2)
//             return tl;
//         }

//         function step3(){
//             let tl = gsap.timeline()
//                     .fromTo("#table-title", {opacity:1}, {opacity: 0, duration:1})
//                     .set("#table-title", {text:'Acces autorise'})
//                     .fromTo("#table-title", {opacity:0}, {opacity: 1, duration:1}, "+=1")
//                     .fromTo("#opening-section", {opacity:1}, {opacity: 0, duration:3}, "+=3")
//             return tl;
//         }

//         let master = gsap.timeline();
//         master.add(step1())
//             .add(step2(), "-=0.3")
//             .add(step3(), "-=1")

//         master.eventCallback("onComplete", function(){
//             $("#opening-section").css("display", "none");
//             $('#defaultCanvas0').css("display", "block");
//             $("#load-section").css("display", "block");
//             load();
//         });
//     }
// })

// function load(){

//     function step1(){
//         gsap.timeline()
//         .fromTo("#defaultCanvas0", {opacity:0}, {opacity: 1, duration:3})
//         .fromTo("#progress-bar", {opacity:0}, {opacity: 1, duration:2}, "-=2")
//         .fromTo("#progress", {opacity:0}, {opacity: 1, duration:3}, "-=1.5")
//         .fromTo("#state", {opacity:0}, {opacity: 1, duration:3}, "-=3")
//     }

//     function step2(){
//         gsap.timeline()
//         .fromTo(".animate-character1", {opacity:0}, {opacity: 1, duration:1})
//         .fromTo(".animate-character2", {opacity:0}, {opacity: 1, duration:1})
//         .fromTo(".animate-character3", {opacity:0}, {opacity: 1, duration:1})
//         .fromTo("#animate-character-container2", {opacity:1}, {opacity: 0, duration:1}, "-=0.7")
//         .repeat(-1)
//     }

//     let master = gsap.timeline();
//         master.add(step1())
//             .add(step2())
            
//     master.eventCallback("onComplete", function(){
//         setInterval(() => {
//             if(loaded == false)
//             {
//                 modifValues();
//             }
//         }, 50);
//     })
// }

//Fonction progress bar
let loaded = false;

function modifValues(){
    
    let val = $('#progress-bar').attr('value');

    if(val >= 100){
        loaded = true;
        start();
    }

    let newVal = val * 1 + 0.25;
    let txt = Math.floor(newVal)+'%';      
      
    $('#progress-bar').attr('value', newVal).text(txt);
    $('#progress').html(txt);
}

function start(){
    let tl = gsap.timeline()
            .fromTo("#progress-bar", {opacity:1}, {opacity:0, duration:2})
            .fromTo("#progress", {opacity:1}, {opacity:0, duration:2}, "-=2")
            .fromTo("#progress-bar-container", {opacity:1}, {opacity:0, duration:2}, "-=2")
            .fromTo("#progress-bar-container", {y:0}, {y:-100})
            .set("#state", {text: 'Pour avancer, scrollez vers le bas'})
            .fromTo("#nav-bar", {opacity:0}, {opacity:1, duration:2})
            .fromTo("#progress-bar-container", {opacity:0}, {opacity:1, duration:2}, "-=2")
    
    tl.eventCallback("onComplete", function(){
        $("#arrow").css("display", "block");
        gsap.fromTo("#arrow", {opacity:0}, {opacity:1, duration:1})
        gsap.fromTo("#arrow", {y:0}, {y:10, yoyo:true, repeat:-1, duration: 1});
    })
}




//Fonction glitch image
let isLoaded = false;
let glitch;
let imgSrc = 'assets/img/logo-trinity.png';

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

//Section artiste
//Affichage section
$("#item1").click(()=>{
    $("#topic1").css("display", "block");
    $("#topic2").css("display", "none");
    $("#topic3").css("display", "none");
    let animation = gsap.fromTo("#topic1", {opacity:0}, {opacity:1, duration:2});
});

$("#item2").click(()=>{
    $("#topic1").css("display", "none");
    $("#topic2").css("display", "block");
    $("#topic3").css("display", "none");
    let animation = gsap.fromTo("#topic2", {opacity:0}, {opacity:1, duration:2});
});

$("#item3").click(()=>{
    $("#topic1").css("display", "none");
    $("#topic2").css("display", "none");
    $("#topic3").css("display", "block");
    let animation = gsap.fromTo("#topic3", {opacity:0}, {opacity:1, duration:2});
});