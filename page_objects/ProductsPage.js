import { expect } from "@playwright/test";

export class ProductsPage {

    constructor(page) {
        this.page = page;
        this.addButtons = page.locator('[data-qa="product-button"]');
    };
    
    visit = async () => {
        await this.page.goto("/");
    };

    addProductToBasket = async (index) => {
        const specificAddButon = this.addButtons.nth(index);

        await specificAddButon.waitFor();
        await expect(specificAddButon).toHaveText("Add to Basket");
        //    await expect(addToBasketButton).toHaveText("Remove from Basket");
        await specificAddButon.click();
        await expect(specificAddButon).toHaveText("Remove from Basket");
    };

};