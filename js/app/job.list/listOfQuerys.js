export const listOfQuerys = [
  {
    name: 'cheapest',
    query: `
   select BOTTOM("price",1) from max 
    `
  },
  {
    name: 'top_3_prices',
    query: `
    select TOP("price", 3) from max 
    `
  },
  {
    name: 'total_price',
    query: `
    select sum("price") from max 
    `
  },
  {
    name: 'total_average_price',
    query: `
    select mean("price") from max 
    `
  },
  {
    name: 'total_median_price',
    query: `
    select median("price") from max 
    `
  },
  {
    name: 'most',
    query: `
    select mode("postcode") from max 
    `
  }
]
