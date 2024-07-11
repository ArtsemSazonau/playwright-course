export class MyAccountPage {
    constructor(page) {
        this.page = page;
        this.accountId = page.getByText('User ID');
        this.errorMessage = page.locator('[data-qa="error-message"]');
    }

    visit = async () => {
        await this.page.goto("/my-account");
        // await this.page.pause();
    }

    waitForAccountId = async () => {
        await this.accountId.waitFor();
    }

    waitForErrorMessage = async () => {
        await this.errorMessage.waitFor();
    }
}