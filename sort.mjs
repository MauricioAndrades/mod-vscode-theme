import fs from "node:fs";
import path from "node:path";
import theme from "/Users/op/Documents/dev/github-clones/mod/themes/mod-color-theme.json" assert { type: "json" };
import settings from "/Users/op/Library/Application Support/Code - Insiders/User/settings.json" assert { type: "json" };
import { execSync } from "node:child_process";

const valid_sortables = [".jsdoc", ".html", ".jsx", ".xml", ".json.comments", ".json", ".json5", ".markdown", ".python", ".regexp"];

const themeTextMateRules = formatRules(sortTextMateRules(theme.textMateRules));
const settingsTextMateRules = formatRules(sortTextMateRules(settings['editor.tokenColorCustomizations']['[mod]']['textMateRules']));

function sortTextMateRules(rules) {
    return rules.sort((a, b) => {
        // Extract scope values
        const scopeA = a.scope;
        const scopeB = b.scope;

        // Extract extensions from scope values
        let extensionA = path.parse(scopeA).ext;
        let extensionB = path.parse(scopeB).ext;

        if (scopeA.endsWith("json.comments")) {
            extensionA = ".json.comments";
        }

        if (scopeB.endsWith("json.comments")) {
            extensionB = ".json.comments";
        }

        // Check if extensions are in valid_sortables
        const isValidExtensionA = valid_sortables.includes(extensionA);
        const isValidExtensionB = valid_sortables.includes(extensionB);

        if (isValidExtensionA && isValidExtensionB) {
            // Both have valid extensions, sort by extension then by scope
            if (extensionA < extensionB) { return -1; }
            if (extensionA > extensionB) { return 1; }
            return scopeA.localeCompare(scopeB);
        } else if (isValidExtensionA) {
            // Only A has a valid extension, it should come first
            return -1;
        } else if (isValidExtensionB) {
            // Only B has a valid extension, it should come first
            return 1;
        } else {
            // Neither has a valid extension, sort by scope
            return scopeA.localeCompare(scopeB);
        }
    });
}

/** @param {typeof theme.textMateRules} rules */
function formatRules(rules) {
    return rules.map(rule=>{
        if (rule.settings?.foreground) {
            rule.settings.foreground = rule.settings.foreground.toUpperCase();
        }
        return rule;
    })
}


fs.writeFileSync('/Users/op/Documents/dev/github-clones/mod/compare/mod-color-theme.json', JSON.stringify(themeTextMateRules, null, 4));
fs.writeFileSync('/Users/op/Documents/dev/github-clones/mod/compare/user-settings.json', JSON.stringify(settingsTextMateRules, null, 4));

execSync("dprint fmt /Users/op/Documents/dev/github-clones/mod/compare/*.json");
