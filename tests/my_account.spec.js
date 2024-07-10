import * as dotenv from "dotenv";
dotenv.config();
import { test } from "@playwright/test";
import { MyAccountPage } from "../page_objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails } from "../data/userDetails";

test("My account cookies injection", async ({ page }) => {

    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);
    const myAccount = new MyAccountPage(page);
    await myAccount.visit();
   
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = ("token=" + loginTokenInsideBrowserCode);
    }, [loginToken]);

    // await page.evaluate(() => {
    //     document.cookie = ("bla-bla=" + "some text");
    // });

    await myAccount.visit();
    await myAccount.waitForAccountId();

    //await page.pause();
})