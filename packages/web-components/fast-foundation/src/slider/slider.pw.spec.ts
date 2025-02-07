import { Direction } from "@microsoft/fast-web-utilities";
import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { fixtureURL } from "../__test__/helpers.js";
import type { FASTSlider } from "./slider.js";
import { SliderOrientation } from "./slider.options.js";

// TODO: Need to add tests for keyboard handling, position, and focus management
test.describe("Slider", () => {
    let page: Page;
    let element: Locator;

    let root: Locator;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();

        await page.goto(fixtureURL("slider--slider"));

        element = page.locator("fast-slider");

        root = page.locator("#root");
    });

    test.afterAll(async () => {
        await page.close();
    });

    test("should have a role of `slider`", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });
        await expect(element).toHaveAttribute("role", "slider");
    });

    test("should set a default `min` property of 0 when `min` is not provided", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await expect(element).toHaveJSProperty("min", 0);
    });

    test("should set a default `max` property of 0 when `max` is not provided", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await expect(element).toHaveAttribute("max", "10");
    });

    test("should set a `tabindex` of 0", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await expect(element).toHaveAttribute("tabindex", "0");
    });

    test("should NOT set a default `aria-disabled` value when `disabled` is not defined", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await expect(element).not.hasAttribute("aria-disabled");
    });

    test("should set a default `aria-orientation` value when `orientation` is not defined", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await expect(element).toHaveAttribute(
            "aria-orientation",
            `${SliderOrientation.horizontal}`
        );
    });

    test("should NOT set a default `aria-readonly` value when `readonly` is not defined", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await expect(element).not.hasAttribute("aria-readonly");
    });

    test("should initialize to the initial value if no value property is set", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        const initialValue = await element.evaluate<string, FASTSlider>(
            node => node.initialValue
        );

        await expect(element).toHaveJSProperty("value", initialValue);
    });

    test("should set the `aria-disabled` attribute when `disabled` value is true", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider) => {
            node.disabled = true;
        });

        await expect(element).toHaveAttribute("aria-disabled", "true");
    });

    test("should NOT set a tabindex when `disabled` value is true", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider) => {
            node.disabled = true;
        });

        await expect(element).not.toHaveAttribute("tabindex", "0");
    });

    test("should set the `aria-readonly` attribute when `readonly` value is true", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider) => {
            node.readOnly = true;
        });

        await expect(element).toHaveAttribute("aria-readonly", "true");
    });

    test("should set the `aria-orientation` attribute equal to the `orientation` value", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider, SliderOrientation) => {
            node.orientation = SliderOrientation.horizontal;
        }, SliderOrientation);

        await expect(element).toHaveAttribute(
            "aria-orientation",
            SliderOrientation.horizontal
        );

        await element.evaluate((node: FASTSlider, SliderOrientation) => {
            node.orientation = SliderOrientation.vertical;
        }, SliderOrientation);

        await expect(element).toHaveAttribute(
            "aria-orientation",
            SliderOrientation.vertical
        );
    });

    test("should set direction equal to the `direction` value", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider, Direction) => {
            node.direction = Direction.ltr;
        }, Direction);

        await expect(element).toHaveJSProperty("direction", Direction.ltr);

        await element.evaluate((node: FASTSlider, Direction) => {
            node.direction = Direction.rtl;
        }, Direction);

        await expect(element).toHaveJSProperty("direction", Direction.rtl);
    });

    test("should set the `aria-valuenow` attribute with the `value` property when provided", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider) => {
            node.value = "8";
        });

        await expect(element).toHaveAttribute("aria-valuenow", "8");
    });

    test("should set the `aria-valuemin` attribute with the `min` property when provided", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider) => {
            node.min = 0;
        });

        await expect(element).toHaveAttribute("aria-valuemin", "0");
    });

    test("should set the `aria-valuemax` attribute with the `max` property when provided", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider) => {
            node.max = 75;
        });

        await expect(element).toHaveAttribute("aria-valuemax", "75");
    });

    test.describe("valueAsNumber", () => {
        test("should allow setting value with number", async () => {
            await root.evaluate(node => {
                node.innerHTML = /* html */ `
                    <fast-slider></fast-slider>
                `;
            });

            await element.evaluate((node: FASTSlider) => {
                node.valueAsNumber = 8;
            });

            await expect(element).toHaveJSProperty("value", "8");
        });

        test("should allow reading value as number", async () => {
            await root.evaluate(node => {
                node.innerHTML = /* html */ `
                    <fast-slider></fast-slider>
                `;
            });

            await element.evaluate((node: FASTSlider) => {
                node.value = "8";
            });

            await expect(element).toHaveJSProperty("valueAsNumber", 8);
        });
    });

    test("should set an `aria-valuestring` attribute with the result of the valueTextFormatter() method", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider) => {
            node.valueTextFormatter = () => "Seventy Five Years";
        });

        await expect(element).toHaveAttribute("aria-valuetext", "Seventy Five Years");
    });

    test.describe("increment and decrement methods", () => {
        test("should increment the value when the `increment()` method is invoked", async () => {
            await root.evaluate(node => {
                node.innerHTML = /* html */ `
                    <fast-slider min="0" max="100" value="50" step="5"></fast-slider>
                `;
            });

            await expect(element).toHaveAttribute("aria-valuenow", "50");

            await element.evaluate((node: FASTSlider) => {
                node.increment();
            });

            await expect(element).toHaveJSProperty("value", "55");

            await expect(element).toHaveAttribute("aria-valuenow", "55");
        });

        test("should decrement the value when the `decrement()` method is invoked", async () => {
            await root.evaluate(node => {
                node.innerHTML = /* html */ `
                    <fast-slider min="0" max="100" value="50" step="5"></fast-slider>
                `;
            });

            await element.evaluate((node: FASTSlider) => {
                node.decrement();
            });

            await expect(element).toHaveJSProperty("value", "45");

            await expect(element).toHaveAttribute("aria-valuenow", "45");
        });
    });

    test("should constrain and normalize the value between `min` and `max` when the value is out of range", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider min="0" max="100"></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider) => {
            node.value = "200";
        });

        await expect(element).toHaveJSProperty("value", "100");

        await expect(element).toHaveAttribute("aria-valuenow", "100");

        await element.evaluate((node: FASTSlider) => {
            node.value = "-5";
        });

        await expect(element).toHaveJSProperty("value", "0");
    });

    test("should initialize to the provided value attribute if set pre-connection", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider value="4"></fast-slider>
            `;
        });

        await element.waitFor({ state: "attached" });

        await expect(element).toHaveJSProperty("value", "4");
    });

    test("should initialize to the provided value attribute if set post-connection", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider) => {
            node.setAttribute("value", "3");
        });

        await expect(element).toHaveJSProperty("value", "3");
    });

    test("should initialize to the provided value property if set pre-connection", async () => {
        await root.evaluate(node => {
            node.innerHTML = "";

            const slider = document.createElement("fast-slider") as FASTSlider;
            slider.value = "3";
            node.appendChild(slider);
        });

        await expect(element).toHaveJSProperty("value", "3");
    });

    test("should update the `stepMultiplier` when the `step` attribute has been updated", async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fast-slider step="2" value="4"></fast-slider>
            `;
        });

        await element.evaluate((node: FASTSlider) => {
            node.increment();
        });

        await expect(element).toHaveJSProperty("value", "6");

        await element.evaluate((node: FASTSlider) => {
            node.step = 0.1;
            node.increment();
        });

        await expect(element).toHaveJSProperty("value", "6.1");
    });

    test.describe("when the owning form's reset() method is invoked", () => {
        test("should reset its `value` property to the midpoint if no `value` attribute is set", async () => {
            await root.evaluate(node => {
                node.innerHTML = /* html */ `
                    <form>
                        <fast-slider></fast-slider>
                    </form>
                `;
            });

            const form = page.locator("form");

            await element.evaluate((node: FASTSlider) => {
                node.value = "3";
            });

            await expect(element).toHaveAttribute("value", "");

            await expect(element).toHaveJSProperty("value", "3");

            await form.evaluate<void, HTMLFormElement>(node => {
                node.reset();
            });

            await expect(element).toHaveJSProperty("value", "5");
        });

        test("should reset its `value` property to match the `value` attribute when it is set", async () => {
            await root.evaluate(node => {
                node.innerHTML = /* html */ `
                    <form>
                        <fast-slider min="0" max="100"></fast-slider>
                    </form>
                `;
            });

            const form = page.locator("form");

            await element.evaluate((node: FASTSlider) => {
                node.setAttribute("value", "7");
            });

            await element.evaluate((node: FASTSlider) => {
                node.value = "8";
            });

            await expect(element).toHaveAttribute("value", "7");
            await expect(element).toHaveJSProperty("value", "8");

            await form.evaluate<void, HTMLFormElement>(node => {
                node.reset();
            });

            await expect(element).toHaveJSProperty("value", "7");
        });

        test("should put the control into a clean state, where the value attribute changes the value property prior to user or programmatic interaction", async () => {
            await root.evaluate(node => {
                node.innerHTML = /* html */ `
                    <form>
                        <fast-slider min="0" max="100"></fast-slider>
                    </form>
                `;
            });

            const form = page.locator("form");

            await element.evaluate((node: FASTSlider) => {
                node.value = "7";
            });

            await element.evaluate((node: FASTSlider) => {
                node.setAttribute("value", "8");
            });

            await expect(element).toHaveJSProperty("value", "7");

            await form.evaluate<void, HTMLFormElement>(node => {
                node.reset();
            });

            await expect(element).toHaveJSProperty("value", "8");

            await element.evaluate((node: FASTSlider) => {
                node.setAttribute("value", "3");
            });

            await expect(element).toHaveJSProperty("value", "3");
        });
    });
});
