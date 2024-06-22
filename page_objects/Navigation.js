export class Navigation {

    constructor(page) {
        this.page = page;
        
        //this.myAccount = page.locator();
        //this.art = page.locator();
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');

    };

    getBasketCount = async () => {
        // return number
        await this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        // '0' -> 0
        return (parseInt(text, 10));
    };

    goToCheckout = async () => {

        await this.checkoutLink.waitFor();
        //console.log(await this.checkoutLink.getAttribute('href'));
        await this.checkoutLink.click();
        await this.page.waitForURL("/basket");

    };
}