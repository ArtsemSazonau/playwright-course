import { test, expect } from "@playwright/test";
import { ProductsPage } from "../page_objects/ProductsPage";
import { Navigation } from "../page_objects/Navigation";
import { Checkout } from "./../page_objects/Checkout";
import { LoginPage } from "../page_objects/LoginPage";

test("New user end-to-end journey", async ( {page} ) => {

    const productsPage = new ProductsPage(page);
    await productsPage.visit();
    //await page.pause();

    await productsPage.sortByCheapest();

    await productsPage.addProductToBasket(0);
    await productsPage.addProductToBasket(1);
    await productsPage.addProductToBasket(2);

    const navigation = new Navigation(page);
    await navigation.goToCheckout();

    const checkout = new Checkout(page);
    await checkout.removeCheapestProduct();
    await checkout.continueToCheckout();

    const login = new LoginPage(page);
    await login.moveToSignup();

    //await page.pause();
});