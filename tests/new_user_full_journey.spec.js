import { test, expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page_objects/ProductsPage";
import { Navigation } from "../page_objects/Navigation";
import { Checkout } from "./../page_objects/Checkout";
import { LoginPage } from "../page_objects/LoginPage";
import { RegisterPage } from "../page_objects/RegisterPage";
import { DeliveryDetails } from "../page_objects/DeliveryDetails";
import { deliveryDetails as userAddress } from "../data/deliveryDetails";
import { PaymentPage } from "../page_objects/PaymentPage";
import { paymentDetails } from "../data/paymentDetails";

test("New user end-to-end journey", async ( {page} ) => {

    test.setTimeout(35000);



    const productsPage = new ProductsPage(page);
    await productsPage.visit();
    //await page.pause();



    await productsPage.sortByCheapest();

    await productsPage.addProductToBasket(0);
    await productsPage.addProductToBasket(1);
    await productsPage.addProductToBasket(2);

    // const navigation = new Navigation(page);
    // await navigation.goToCheckout();

    // const checkout = new Checkout(page);
    // await checkout.removeCheapestProduct();
    // await checkout.continueToCheckout();

    // const login = new LoginPage(page);
    // await login.moveToSignup();

    // const registerPage = new RegisterPage(page)
    // const email = uuidv4() + "@gmail.com";
    // const password = uuidv4();
    // await registerPage.signUpAsNewUser(email, password);

    // const deliveryDetails = new DeliveryDetails(page);
    // await deliveryDetails.fillDetails(userAddress);
    // await deliveryDetails.saveDetails();
    // await deliveryDetails.continueToPayment();

    
    // const paymentPage = new PaymentPage(page);
    // await paymentPage.fillPaymentDetails(paymentDetails);
    // await paymentPage.activateDiscount();
    // await paymentPage.completePayment();
    



    //await page.pause();
});