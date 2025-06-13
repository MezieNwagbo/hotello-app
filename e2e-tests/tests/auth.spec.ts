import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button and click
  await page.getByRole("link", { name: "Sign in" }).click();

  //should navigate to sign in page.. so check if the page title is "Sign in"
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  //simulate filling of the email and password fields
  //fetch and fill the fields
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  //fetch and click the button
  await page.getByRole("button", { name: "Login" }).click();

  //assert that following are shown
  await expect(page.getByText("Sign in Successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;

  await page.goto(UI_URL);

  //go to page

  //click sign in  --> this should take you to the sign in page
  await page.getByRole("link", { name: "Sign in" }).click();

  // fetch create an account here text and click
  await page.getByRole("link", { name: "Create an account here" }).click();
  //---> this should take you to the register page (confirm that it does)
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  //fill in all the fields for register
  await page.locator("[name=firstName]").fill("test_firstname");
  await page.locator("[name=lastName]").fill("test_lastname");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("abcABC123#");
  await page.locator("[name=confirmPassword]").fill("abcABC123#");

  // click create account
  await page.getByRole("button", { name: "Create Account" }).click();
  //--> this should show the logged in linkes
  await expect(page.getByText("Registration successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
