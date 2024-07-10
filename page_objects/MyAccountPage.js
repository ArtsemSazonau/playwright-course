export class MyAccountPage {
    constructor(page) {
        this.page = page;
        this.accountId = page.getByText('User ID: 4e4bbbae-1ddc-420d-94c9-abe24d0c9504');
    }

    visit = async () => {
        await this.page.goto("/my-account");
        // await this.page.pause();
    }

    waitForAccountId = async () => {
        await this.accountId.waitFor();
    }
}