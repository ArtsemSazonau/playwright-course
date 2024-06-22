export class RegisterPage {
    constructor (page) {
        this.page = page

        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.signUpButton = page.getByRole('button', { name: 'register'})
    };

    signUpAsNewUser = async () => {

        await this.emailInput.waitFor();
        await this.emailInput.fill("sometestingemail@testing.com");
        
        await this.passwordInput.waitFor();
        await this.passwordInput.fill("P@ssw0rd");

        await this.signUpButton.waitFor();
        await this.signUpButton.click();

    };
}