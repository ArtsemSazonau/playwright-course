import { expect } from "@playwright/test";
import { spec } from "node:test/reporters";


export class Checkout {

    constructor(page) {
        this.page = page;
        this.basketCards = page.locator('[data-qa="basket-card"]');
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');

    };

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor();
        const itemsBeforRemoval = await this.basketCards.count();
        await this.basketItemPrice.first().waitFor();
        const allPriceTexts = await this.basketItemPrice.allInnerTexts();
        const justNumbers = allPriceTexts.map((element) => {


            const withoutDollarSign = element.replace("$", "");
            return parseInt(withoutDollarSign, 10);
  
        });
  

        const smallestPrice = Math.min(justNumbers);
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice);
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIdx);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await expect(this.basketCards).toHaveCount(itemsBeforRemoval - 1); 
        //await this.page.pause();
    };

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();

        await this.page.waitForURL(/\/login/, {timeout: 2000});
        //await this.page.pause();
    };
    

}