/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const result = [];
  const total_amount = {};

  transactions.forEach((element) => {
    const curr_amount = element.price + (total_amount[element.category] ?? 0); // O(1)

    total_amount[element.category] = curr_amount; // O(1)
  }); // O(n transaction)

  for (const [key, value] of Object.entries(total_amount)) {
    result.push({
      category: key,
      totalSpent: value,
    }); // O(1)
  } // O(m category)

  return result;
}

module.exports = calculateTotalSpentByCategory;
