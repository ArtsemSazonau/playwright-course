import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postCodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.deliveryCountryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.locator('[data-qa="save-address-button"]')
        this.pageContinueButon = page.locator('[data-qa="continue-to-payment-button"]')
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')

        this.savedAdressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAdressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAdressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAdressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAdressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')

    }

    fillDetails = async (userAddress) => {

        await this.firstNameInput.waitFor()
        //const firstName = 'testFirstName'
        this.firstNameInput.fill(userAddress.firstName)

        await this.lastNameInput.waitFor()
        //const lastName = 'testLastName'
        this.lastNameInput.fill(userAddress.lastName)

        await this.streetInput.waitFor()
        //const street = 'testStreet'
        this.streetInput.fill(userAddress.street)

        await this.postCodeInput.waitFor()
        //const postCode = 'testPostCode'
        this.postCodeInput.fill(userAddress.postcode)

        await this.cityInput.waitFor()
        //const city = 'testCity'
        this.cityInput.fill(userAddress.city)

        await this.deliveryCountryDropdown.waitFor()
        //const country = 'Albania'
        await this.deliveryCountryDropdown.selectOption(userAddress.country);
    }

    saveDetails = async () => {
        const adressCountBeforeSaving = await this.savedAddressContainer.count()
    
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(adressCountBeforeSaving + 1)

        //await this.savedAdressFirstName.first().waitFor()
        expect(await this.savedAdressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())

        //await this.savedAdressLastName.first().waitFor()
        expect(await this.savedAdressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())

        await this.savedAdressStreet.first().waitFor()
        expect(await this.savedAdressStreet.first().innerText()).toBe(await this.streetInput.inputValue())

        await this.savedAdressCity.first().waitFor()
        expect(await this.savedAdressCity.first().innerText()).toBe(await this.cityInput.inputValue())

        //await this.savedAdressFirstName.first().waitFor()
        expect(await this.savedAdressPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue())

        //await this.savedAdressFirstName.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.deliveryCountryDropdown.inputValue())
    }

    continueToPayment = async () => {
        await this.pageContinueButon.waitFor()
        await this.pageContinueButon.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })
    }
}