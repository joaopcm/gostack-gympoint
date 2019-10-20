module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Aluno de teste',
          email: 'alunodeteste@gmail.com',
          birth: new Date('2002-09-06 20:00:00'),
          weight: 65,
          height: 1.75,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
