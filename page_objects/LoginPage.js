export class LoginPage {
    constructor(page) {
        this.page = page;
        this.moveToSignupButon = page.locator('[data-qa="go-to-signup-button"]');
    }

    moveToSignup = async () => {
        await this.moveToSignupButon.waitFor();
        await this.moveToSignupButon.click();

        await this.page.waitForURL(/\/signup/gm, {timeout: 3000})
    }
}