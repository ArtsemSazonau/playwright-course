import { isDesktopViewport} from "./../utils/isDesktopViewport.js";

export class Navigation {

    constructor(page) {
        this.page = page;
        
        //this.myAccount = page.locator();
        //this.art = page.locator();
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]');

    };

    getBasketCount = async () => {
        // return number
        await this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return (parseInt(text, 10));
    };

    goToCheckout = async () => {


        // if mpbile, first open the burger menu
        if (!isDesktopViewport(this.page)) {
            await this.mobileBurgerButton.waitFor();
            await this.mobileBurgerButton.click();
        };

        await this.checkoutLink.waitFor();
        await this.checkoutLink.click();
        await this.page.waitForURL("/basket");

    };
}