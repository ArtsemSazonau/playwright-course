export class Navigation {

    constructor(page) {
        this.page = page;
        
        //this.myAccount = page.locator();
        //this.art = page.locator();
        //this.checkout = page.locator();
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');

    };

    getBasketCount = async () => {
        // return number
        await this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        // '0' -> 0
        return (parseInt(text, 10));
    };
}