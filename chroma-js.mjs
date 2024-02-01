const chroma = require('chroma-js');

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
      const variationColor = baseColor
        .darken(brightness)
        .saturate(saturation)
        .vibrance(vibrance);

      // Push the variation color to the array
      variations.push(variationColor);
    }

    return variations;
  }