import { expect } from "@playwright/test"



export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]');
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]');
        this.discountActivateMessage = page.locator('[data-qa="discount-active-message"]');
        this.totalPrice = page.locator('[data-qa="total-value"]');
        this.discountPrice = page.locator('[data-qa="total-with-discount-value"]');
        this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]');
        this.creditCardNumber = page.locator('[data-qa="credit-card-number"]');
        this.validUntil = page.locator('[data-qa="valid-until"]');
        this.creditCardCVC = page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    }

    activateDiscount = async() => {
        await this.discountCode.waitFor()      
        const code = await this.discountCode.innerText()
        await this.discountCodeInput.waitFor()

        // Option 1 using .fill() with await expect()
        await this.discountCodeInput.fill(code);
        await expect(this.discountCodeInput).toHaveValue(code)

        // Option 2 using keyboard API
        // await this.discountCodeInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000}, {timeout: 30000})
        // expect(await this.discountCodeInput.inputValue()).toBe(code);
        
        await this.totalPrice.waitFor();
        await expect(this.discountActivateMessage).toBeHidden();
        
        
        await this.activateDiscountButton.waitFor();
        await this.activateDiscountButton.click();

        await expect(this.discountActivateMessage).toBeVisible();
        await expect(this.discountPrice).toBeVisible();
        const totalPriceInt = Number((await this.totalPrice.textContent()).slice(0, -1));
        const discountPriceInt = Number((await this.discountPrice.textContent()).slice(0, -1));
        await expect(totalPriceInt).toBeGreaterThan(discountPriceInt);


        // console.warn(await this.totalPrice.textContent());
        // console.warn(totalPriceInt);
        // console.error(await this.discountPrice.textContent());
        // console.error(discountPriceInt);

    }

    fillPaymentDetails = async(paymentDetails) => {

        
        await this.creditCardOwner.waitFor();
        await this.creditCardNumber.waitFor();
        await this.validUntil.waitFor();
        await this.creditCardCVC.waitFor();

        await this.creditCardCVC.waitFor();
        this.creditCardCVC.fill(paymentDetails.creditCardCvc);

        await this.validUntil.waitFor();
        this.validUntil.fill(paymentDetails.validUntil);

        await this.creditCardNumber.waitFor();
        this.creditCardNumber.fill(paymentDetails.creditCardNumber);

        await this.creditCardOwner.waitFor();
        this.creditCardOwner.fill(paymentDetails.creditCardOwner);

        

        

        

    }

    completePayment = async() => {
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000});
    }
}