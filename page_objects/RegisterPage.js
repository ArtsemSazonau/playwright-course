export class RegisterPage {
    constructor (page) {
        this.page = page

        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.signUpButton = page.getByRole('button', { name: 'register'})
    };

    signUpAsNewUser = async (email, password) => {

        await this.emailInput.waitFor();
        //const emailId = uuidv4();
        //const email = emailId + "@test.com"
        await this.emailInput.fill(email);
        
        await this.passwordInput.waitFor();
        //const password = uuidv4();
        await this.passwordInput.fill(password);

        await this.signUpButton.waitFor();
        await this.signUpButton.click();

    };
}