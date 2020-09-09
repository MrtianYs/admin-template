<template>
    <div class="login">
        <div class="login-title"> 后台管理系统 </div>
        <a-form-model :model="loginForm" :rules="rules" ref="login">
            <a-form-model-item prop="account">
                <a-input size="large" style="width: 350px" v-model="loginForm.account" placeholder="请输入账号">
                    <a-icon slot="prefix" type="user" />
                </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
                <a-input
                    size="large"
                    type="password"
                    style="width: 350px"
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                >
                    <a-icon slot="prefix" type="lock" />
                </a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" @click="loginIn" block size="large">登录</a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
    import { login } from '@/api/user'
    export default {
        data () {
            return {
                loginForm: {
                    account: 'admin',
                    password: '123456'
                },
                rules: {
                    account: [
                        { required: true, message: '请输入您的账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入您的密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            loginIn () {
                const form = this.$refs.login
                form.validate(valid => {
                    if (valid) {
                        login(this.loginForm).then((res) => {

                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
	.login {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -150%);
		&-title {
			font-size: 36px;
			font-weight: 800;
			margin-bottom: 40px;
			text-align: center;
		}
	}
</style>
