import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";


export class ProductsPage {

    constructor(page) {
        this.page = page;
        this.addButtons = page.locator('[data-qa="product-button"]');
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    };

    visit = async () => {
        await this.page.goto("/");
    };


    addProductToBasket = async (index) => {
        const specificAddButon = this.addButtons.nth(index);
        await specificAddButon.waitFor();

        await expect(specificAddButon).toHaveText("Add to Basket");
        
        const navigation = new Navigation(this.page);

        const basketCountBeforeAdding = await navigation.getBasketCount();
        await specificAddButon.click();
        
        await expect(specificAddButon).toHaveText("Remove from Basket");
        
        const basketCountAfterAdding = await navigation.getBasketCount();
        
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);

    };

}
