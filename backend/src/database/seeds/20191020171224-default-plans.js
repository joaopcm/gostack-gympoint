module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'plans',
      [
        {
          title: 'Start',
          duration: 3,
          price: 80,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Gold',
          duration: 6,
          price: 70,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Diamond',
          duration: 12,
          price: 60,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
