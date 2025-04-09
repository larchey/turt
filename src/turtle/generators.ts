interface WeightedItem<T> {
  value: T;
  weight: number;
}

/**
 * Generate a random item from a weighted list
 * The higher the weight, the more likely an item is to be selected
 */
export function generateRandom<T>(items: T[], weights?: WeightedItem<T>[]): T {
  // If no weights provided, use equal distribution
  if (!weights || weights.length === 0) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  // Make sure all items have weights
  const weightedItems: WeightedItem<T>[] = [];
  const itemsWithWeights = new Set(weights.map(w => w.value));
  
  // Add provided weights
  weightedItems.push(...weights);
  
  // Add default weights for items without specified weights
  for (const item of items) {
    if (!itemsWithWeights.has(item)) {
      weightedItems.push({ value: item, weight: 1 });
    }
  }

  // Calculate total weight
  const totalWeight = weightedItems.reduce((sum, item) => sum + item.weight, 0);
  
  // Generate a random value between 0 and totalWeight
  let random = Math.random() * totalWeight;
  
  // Find the item that corresponds to the random value
  for (const item of weightedItems) {
    random -= item.weight;
    if (random <= 0) {
      return item.value;
    }
  }
  
  // Fallback in case of floating point errors
  return weightedItems[weightedItems.length - 1].value;
}
