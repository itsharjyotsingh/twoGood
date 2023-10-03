const locomotiveScrollTrigger = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locomotiveScrollTrigger();

const navbarLogoAnimation = () => {
    gsap.to('#nav-part1 svg', {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: '#page1',
            scroller: '#main',
            start: "top 0%",
            end: "top -5%",
            scrub: 1
        }
    })

    gsap.to('#nav-part2 #links', {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
            trigger: '#page1',
            scroller: '#main',
            start: "top 0%",
            end: "top -5%",
            scrub: 1
        }
    })

    // gsap.to('#nav-part2 #icons', {
    //     transform: "translateX(-50px)",
    //     scrollTrigger: {
    //         trigger: '#page1',
    //         scroller: '#main',
    //         start: "top 0%",
    //         end: "top -5%",
    //         scrub: 1
    //     }
    // })
}
navbarLogoAnimation();

const videoAnimation = () => {
    var videocon = document.querySelector('#video-container');
    var playbtn = document.querySelector('#play');

    videocon.addEventListener('mouseenter', () => {
        gsap.to(playbtn, {
            opacity: 1,
            scale: 1,
            duration: 0.2
        });
    })

    videocon.addEventListener('mouseleave', () => {
        gsap.to(playbtn, {
            opacity: 0,
            scale: 0,
            duration: 0.2
        });
    })

    videocon.addEventListener('mousemove', (dets) => {
        gsap.to(playbtn, {
            left: dets.x,
            top: dets.y,
            duration: 0.4
        })
    });
}
videoAnimation();

const pageLoadingAnimation = () => {
    gsap.from('#page1 h1', {
        y: 100,
        opacity: 0,
        delay: 0.5,
        stagger: 0.2,
        duration: 0.8,
    })

    gsap.from('#page1 #video-container', {
        scale: 0.9,
        opacity: 0,
        delay: 1.3,
        duration: 0.3,
    })
}
pageLoadingAnimation();

const elementHoverAnimations = () => {
    const eles = document.querySelectorAll('.elem .dets');
    eles.forEach((ele) => {
        ele.addEventListener('mouseenter', () => {
            gsap.to(ele, {
                height: '200px',
                y: 70,
                borderRadius: "30px",
                duration: 0.2
            })
        });

        ele.addEventListener('mouseleave', () => {
            gsap.to(ele, {
                height: '60px',
                y: 0,
                duration: 0.2
            })
        });
    })
}
elementHoverAnimations();

const childElementAnimation = () => {
    document.addEventListener('mousemove', (dets) => {
        gsap.to('#cursor', {
            top: dets.y,
            left: dets.x,
        });
    });

    const elements = document.querySelectorAll('.child');

    elements.forEach((ele) => {
        ele.addEventListener('mouseenter', () => {
            gsap.to('#cursor', {
                transform: 'translate(-50%, -50%)',
                scale: 1
            })
        })

        ele.addEventListener('mouseleave', () => {
            gsap.to('#cursor', {
                scale: 0
            })
        })
    })
}
childElementAnimation();
