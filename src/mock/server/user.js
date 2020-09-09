import Mock from 'mockjs'

const Login = {
	code: 200,
	data: {
		token: Mock.Random.string(30)
	}
}

Mock.mock('/login', 'post', Login)
