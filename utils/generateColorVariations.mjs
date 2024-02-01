import chroma from 'chroma-js';
import theme from '../themes/mod-color-theme.json' assert {type: "json"};

// Function to generate a range of color variations
function generateColorVariations(baseColor, numVariations = 10) {
  // Initialize an array to store the variations
  const variations = [];

  // Generate color variations
  for (let i = 0; i < numVariations; i++) {
    // Calculate the progress from -1 to 1
    const progress = (i - (numVariations - 1) / 2) / ((numVariations - 1) / 2);

    // Calculate brightness, saturation, and vibrance variations
    const brightness = progress * 0.5; // Varies from -0.5 to 0.5 (darker to brighter)
    const saturation = 1 - Math.abs(progress) * 0.5; // Varies from 1 to 0.5 (more saturated to less saturated)
    const vibrance = 1 + progress * 0.5; // Varies from 1 to 1.5 (less vibrant to more vibrant)

    // Create the variation color
    const variationColor = chroma(baseColor)
      .darken(brightness)
      .saturate(saturation)
      .hex()
      .toUpperCase();

    // Push the variation color to the array
    variations.push(variationColor);
  }

  return [...new Set(variations.flat(Infinity))].flat(Infinity).filter(Boolean); // Remove duplicates and return the array of color variations
}


let colorVariations = [...new Set(theme.tokenColors.map(rule=>{
  if (rule.settings.foreground) {
    return generateColorVariations(rule.settings.foreground, 30)
  }
}).flat(Infinity).filter(Boolean))];

colorVariations = [...new Set(colorVariations.flat(Infinity).filter(Boolean))]


debugger;

