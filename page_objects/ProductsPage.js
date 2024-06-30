import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";

const isDesktopViewport = (page) => {
    //true or false
    const size = page.viewportSize();
    return size.width >= 600;
}


export class ProductsPage {

    constructor(page) {
        this.page = page;
        this.addButtons = page.locator('[data-qa="product-button"]');
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
        this.productTitle = page.locator('[data-qa="product-title"]');
    };

    visit = async () => {
        await this.page.goto("/");
    };


    addProductToBasket = async (index) => {
        const specificAddButon = this.addButtons.nth(index);
        await specificAddButon.waitFor();

        await expect(specificAddButon).toHaveText("Add to Basket");
        
        const navigation = new Navigation(this.page);
        // only desktop
        if (isDesktopViewport(this.page)) {
            const basketCountBeforeAdding = await navigation.getBasketCount();
        }
        await specificAddButon.click();
        
        await expect(specificAddButon).toHaveText("Remove from Basket");
        // only desktop
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount();
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
        }

    };

    sortByCheapest = async() => {
        await this.sortDropdown.waitFor();
      

        await this.productTitle.first().waitFor();
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();

        await this.sortDropdown.selectOption("price-asc");

        const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);


    };

}
