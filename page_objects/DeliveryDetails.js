export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postCodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.deliveryCountryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.deliverySaveButton = page.locator('[data-qa="save-address-button"]')
        this.pageContinueButon = page.locator('[data-qa="continue-to-payment-button"]')

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
}