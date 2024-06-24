import { expect } from "@playwright/test"



export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')
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
        

    }
}