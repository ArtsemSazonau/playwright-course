import { test } from "@playwright/test";
import { MyAccountPage } from "../page_objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails } from "../data/userDetails";

test("My account cookies injection and mocking network request", async ({ page }) => {

    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);

    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "MOCKING ERROR"}),
        });
    });


    const myAccount = new MyAccountPage(page);
    await myAccount.visit();

    // await page.pause();

   
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = ("token=" + loginTokenInsideBrowserCode);
    }, [loginToken]);

    // await page.evaluate(() => {
    //     document.cookie = ("bla-bla=" + "some text");
    // });

    await myAccount.visit();
    //await myAccount.waitForAccountId();
    await myAccount.waitForErrorMessage();

    // await page.pause();
})