export const isDesktopViewport = (page) => {
    //true or false
    const size = page.viewportSize();
    return size.width >= 600;
}