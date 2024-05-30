

const sectionEls = document.querySelectorAll(".animate");

const options = {
  rootMargin: "10%",
  threshold: 0.5,
};
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
console.log("prefersReducedMotion:", prefersReducedMotion); // Add this console log

const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
    const isLeftDoor = entry.target.classList.contains("door--left");
    const isRightDoor = entry.target.classList.contains("door--right");
    const isWaterflow = entry.target.classList.contains("waterflow")
    const isBoat = entry.target.classList.contains("boat")
    const isFish = entry.target.classList.contains("conveyor-fish-two")
    const isPackFish = entry.target.classList.contains("fish-package")
    const isPackFish2 = entry.target.classList.contains("fish-package2")
    const isHand = entry.target.classList.contains("hand")
    const isArm = entry.target.classList.contains("arm")

    if(entry.isIntersecting && isLeftDoor){
            entry.target.classList.add("animation-left");
        }else{
            entry.target.classList.remove("animation-left");

    }if(entry.isIntersecting && isRightDoor)
    entry.target.classList.add("animation-right");
    else{
      entry.target.classList.remove("animation-right")
    }
    if(entry.isIntersecting && isWaterflow)
    entry.target.classList.add("squiggle");
    else{
      entry.target.classList.remove("squiggle")

    }if(entry.isIntersecting && isFish)
    entry.target.classList.add("conveyor-fish-two-animate");
    else{
      entry.target.classList.remove("conveyor-fish-two-animate")

    }if(entry.isIntersecting && isPackFish)
    entry.target.classList.add("fish-package-animation");
    else{
      entry.target.classList.remove("fish-package-animation")

    }if(entry.isIntersecting && isPackFish2)
    entry.target.classList.add("fish-package2-animation");
    else{
      entry.target.classList.remove("fish-package2-animation")
    }

    
    if(entry.isIntersecting && isHand)
    entry.target.classList.add(".hand-animation");
    else{
      entry.target.classList.remove(".hand-animation")
    }
    if(entry.isIntersecting && isArm)
    entry.target.classList.add("arm-animation");
    else{
      entry.target.classList.remove("arm-animation")
    }


    if (entry.isIntersecting && isBoat){
      gsap.from(".boat", {duration:3, rotate:'-5%', repeat:-1});
      gsap.to(".boat", {duration:3, y:'10%', rotate:'5%', repeat:-1, yoyo:true});
    }
  }, options);
});
sectionEls.forEach((el) => observer.observe(el));

const backPath = document.querySelector('.back-path');
const boatBack = document.querySelector('.boat-back');

const totalLength = backPath.getTotalLength();

const position = { x: 0, y: 0 };

const animationDuration = prefersReducedMotion ? 110 : 30; // Adjust duration based on prefers-reduced-motion
const animationTween = gsap.to(position, {
  x: totalLength,
  duration: animationDuration,
  repeat: 1,
  onUpdate: () => {
    const point = backPath.getPointAtLength(position.x);
    boatBack.setAttribute('x', point.x - 25);
    boatBack.setAttribute('y', point.y - 25);
  },
  paused: true
});

const observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animationTween.play();
    } else {
      animationTween.pause();
    }
  });
}, { threshold: 0 });

observer2.observe(backPath);

const path2 = document.querySelector('.path2');
const boat2 = document.querySelector('.boat-china');

const totalLength2 = path2.getTotalLength();

const position2 = { x: totalLength2, y: 0 };


const boatAnimationDuration2 = prefersReducedMotion ? 100 : 30; // Adjust duration based on prefers-reduced-motion
const boatAnimationTween2 = gsap.to(position2, {
  x: 0,
  duration: boatAnimationDuration2,
  onUpdate: () => {
    const point2 = path2.getPointAtLength(position2.x);
    boat2.setAttribute('x', point2.x - 25);
    boat2.setAttribute('y', point2.y - 25);
  },
  repeat: 1,
  paused: true
});

const observer3 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      boatAnimationTween2.play();
    } else {
      boatAnimationTween2.pause();
    }
  });
}, { threshold: 0 });

observer3.observe(path2);



// Gsap for scene 1
const gsapDuration = prefersReducedMotion ? 8 : 16; // Adjust duration based on prefers-reduced-motion

if (!prefersReducedMotion) { // Check if prefers-reduced-motion is not set to reduce
  gsap.to([".sky-one", ".sky-three"], {duration: 8, x: '-4vw', repeat:-1, yoyo:true});
  gsap.to([".sky-two", ".sky-four"], {duration: 8, x: '-4vw', repeat:-1, yoyo:true, delay:2});
  gsap.to([".water-two", ".water-four"], {duration: 2, x: '-4vw', repeat:-1, yoyo:true});
  gsap.to([".water-one", ".water-three"], {duration: 2, x: '-4vw', repeat:-1, yoyo:true, delay:1});
} else {
  gsap.to([".sky-one", ".sky-three", ".sky-two", ".sky-four", ".water-one", ".water-three", ".water-two", ".water-four"], { duration: gsapDuration, x: '-4.8vw', repeat: -1, yoyo: true });
}

