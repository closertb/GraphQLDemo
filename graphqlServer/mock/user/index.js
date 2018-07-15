/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2017-06-15
 */
const users = [
  {
    id: 1,
    userName: 'Dick Winters',
    chiefs: [],
    age: 38,
    military: 'Colonel',
    height: 182,
    education: 'doctor degree',
    enlistTime: '1935-06-18',
    enlistYear: 8
  },
  {
    id: 2,
    userName: 'Ronald Spiers',
    chiefs: [1],
    age: 32,
    military: 'Major',
    height: 187,
    education: 'master degree',
    enlistTime: '1935-06-18',
    enlistYear: 7
  },
  {
    id: 3,
    userName: 'Matthew Settle',
    chiefs: [1, 2],
    age: 32,
    military: 'Captain',
    height: 173,
    education: 'colleage diploma',
    enlistTime: '1935-06-18',
    enlistYear: 7
  },
  {
    id: 4,
    userName: 'Buck Compton',
    chiefs: [1, 2],
    age: 35,
    military: 'Captain ',
    height: 1176,
    education: 'university diploma',
    enlistTime: '1935-06-18',
    enlistYear: 8
  },
  {
    id: 5,
    userName: 'Neal McDonough',
    chiefs: [3, 4],
    age: 29,
    military: 'First Lieutenant ',
    height: 181,
    education: 'university diploma',
    enlistTime: '1935-06-18',
    enlistYear: 4
  },
  {
    id: 6,
    userName: 'Lewis Nixon',
    chiefs: [2, 3, 4],
    age: 41,
    military: 'Master Sergeant',
    height: 183,
    education: 'bachelor degree',
    enlistTime: '1935-06-18',
    enlistYear: 6
  },
  {
    id: 7,
    userName: 'Ron Livingston',
    chiefs: [4, 5],
    age: 27,
    military: 'Sergeant',
    height: 179,
    education: 'bachelor degree',
    enlistTime: '1935-06-18',
    enlistYear: 5
  },
  {
    id: 8,
    userName: 'Bull Randleman',
    chiefs: [4, 5, 6],
    age: 28,
    military: 'Sergeant',
    height: 175,
    education: 'doctor degree',
    enlistTime: '1935-06-18',
    enlistYear: 8
  },
  {
    id: 9,
    userName: 'Carwood Lipton',
    chiefs: [6, 7],
    age: 38,
    military: 'Corporal ',
    height: 186,
    education: 'master degree',
    enlistTime: '1935-06-18',
    enlistYear: 2
  },
]
const getUserById = (userId) => {
  const res = users.filter(({ id }) => id === +userId);
  return res[0];
}
export default router => {

	router.get('/users/:id', ({ params }, res) => {
		const { id } = params;
		res.send(getUserById(id));
	});

	router.get('/users', ({ query }, res) => {

		const { pageSize, pageNum, ...params } = query;

		res.send({

			total: users.length,
      pageSize: pageSize || 10,
      pageNum: pageNum || 1,
			data: users
		});

	});

	router.get('/api/:userId/nickName/', (req, res) => {
		res.send(`denzel ${req.params.userId}`);
	});

}
