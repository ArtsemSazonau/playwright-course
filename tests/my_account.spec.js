import { test } from "@playwright/test";
import { MyAccountPage } from "../page_objects/MyAccountPage";

test("My account cookies injection", async ({ page }) => {
    const myAccount = new MyAccountPage(page);
    await myAccount.visit();
})