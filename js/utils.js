export function isColliding(object, paddle) {
    //check if padle is colliding with falling objects

    return (
        object.xposition < paddle.xposition + paddle.width &&
        object.xposition + object.width > paddle.xposition &&
        object.yposition < paddle.yposition + paddle.height &&
        object.yposition + object.height > paddle.yposition
    );
}

//Define function to preload images
export function preloadImages(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}