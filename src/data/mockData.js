
export const DBIO_NAMES = [
  'zord_svc_s001',
  'zord_svc_s002',
  'cust_info_q105',
  'prod_list_v202',
  'acct_bal_c300'
];

const SQL_SAMPLES = {
  basic: `SELECT * 
FROM users 
WHERE status = 'ACTIVE' 
  AND created_at > '2023-01-01';`,
  
  join: `SELECT u.id, u.name, o.order_date, o.amount
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'COMPLETED'
ORDER BY o.order_date DESC;`,
  
  complex: `WITH MonthlyStats AS (
    SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as total_orders,
        SUM(amount) as total_revenue
    FROM orders
    GROUP BY 1
)
SELECT * 
FROM MonthlyStats
WHERE total_revenue > 10000;`,

  nested: `SELECT *
FROM products p
WHERE p.category_id IN (
    SELECT c.id FROM categories c WHERE c.parent_id = 105
)
AND p.stock > 0;`
};

export const DBIO_DETAILS = {
  'zord_svc_s001': {
    name: 'zord_svc_s001',
    title: 'User General Service Inquiry',
    description: 'Retrieves user detailed information including service history and active subscriptions based on unique user ID.',
    structure: {
      id: '1',
      title: 'Root Query Wrapper',
      level: 1,
      children: [
        {
          id: '1.1',
          title: 'Fetch Basic User Info',
          level: 2,
          children: [
            { id: '1.1.1', title: 'Get Address Details', level: 3, children: [] },
            { id: '1.1.2', title: 'Get Contact Preferences', level: 3, children: [] }
          ]
        },
        {
          id: '1.2',
          title: 'Fetch Active Subscriptions',
          level: 2,
          children: [
             { id: '1.2.1', title: 'Filter Expired Subs', level: 3, children: [] }
          ]
        }
      ]
    },
    queries: {
      '1': { sql: SQL_SAMPLES.basic },
      '1.1': { sql: SQL_SAMPLES.basic },
      '1.1.1': { sql: SQL_SAMPLES.join },
      '1.1.2': { sql: SQL_SAMPLES.nested },
      '1.2': { sql: SQL_SAMPLES.complex },
      '1.2.1': { sql: SQL_SAMPLES.basic }
    }
  },
  'zord_svc_s002': {
    name: 'zord_svc_s002',
    title: 'Product Catalog Search',
    description: 'Searches the product catalog with various filters including price range, category, and availability.',
    structure: {
      id: '1',
      title: 'Main Product Search',
      level: 1,
      children: [
        {
          id: '1.1',
          title: 'Category Filtering',
          level: 2,
          children: []
        },
        {
          id: '1.2',
          title: 'Inventory Check',
          level: 2,
          children: []
        }
      ]
    },
    queries: {
      '1': { sql: SQL_SAMPLES.complex },
      '1.1': { sql: SQL_SAMPLES.nested },
      '1.2': { sql: SQL_SAMPLES.basic }
    }
  }
};

// Fill in other DBIOs with generic data if accessed
DBIO_NAMES.forEach(name => {
  if (!DBIO_DETAILS[name]) {
    DBIO_DETAILS[name] = {
      name: name,
      title: `Generic Title for ${name}`,
      description: `This is a placeholder description for ${name}. It performs standard database operations suitable for its context.`,
      structure: {
        id: '1',
        title: 'Main Block',
        level: 1,
        children: [
          { id: '1.1', title: 'Sub Block A', level: 2, children: [] },
          { id: '1.2', title: 'Sub Block B', level: 2, children: [] }
        ]
      },
      queries: {
        '1': { sql: SQL_SAMPLES.basic },
        '1.1': { sql: SQL_SAMPLES.join },
        '1.2': { sql: SQL_SAMPLES.complex }
      }
    };
  }
});

// Mock Similarity Search Generator
export const getSimilarQueries = (subqueryId, sourceDbioName) => {
  // Generate 10 random-ish results
  const results = [];
  const sourceTitle = DBIO_DETAILS[sourceDbioName]?.queries[subqueryId]?.title || "Unknown Query";
  
  for (let i = 0; i < 10; i++) {
    const randomDbio = DBIO_NAMES[Math.floor(Math.random() * DBIO_NAMES.length)];
    const score = (98.5 - (i * 2.3) + (Math.random())).toFixed(2);
    
    results.push({
      id: `sim_${i}`,
      dbioName: randomDbio,
      title: `Similar Logic: ${randomDbio}_sub${i}`,
      description: `This query in ${randomDbio} shares similar structural patterns with the selected subquery. It uses similar joins and filters.`,
      sql: i % 2 === 0 ? SQL_SAMPLES.join : SQL_SAMPLES.complex,
      score: score
    });
  }
  return results.sort((a, b) => b.score - a.score);
};
