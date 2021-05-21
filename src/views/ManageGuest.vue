<template>
	<div>
		<el-card>
			<!--用户列表-->
			<el-table :data="userList" :border="true" :stripe="true" @row-click="handle">
				<el-table-column label="用户名" prop="username"></el-table-column>
				<el-table-column label="邮箱" prop="email"></el-table-column>
				<el-table-column label="角色" prop="role" ></el-table-column>
				<el-table-column label="状态"  prop="phone"></el-table-column>
					<el-table-column label="操作" width="200">
	
							<el-button size="mini" type="primary" icon="el-icon-edit" @click="isShow=true">修改</el-button>
							<el-button size="mini" type="success" icon="el-icon-location" @click.prevent="deleteUser">删除</el-button>

					</el-table-column>
			</el-table>

			

	
		</el-card>
		
		<div class="guest-box" v-show="isShow">
			<el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
			<el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
			<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
			<el-input type="email" v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item label="用户类别" prop="role">
			<el-radio v-model="ruleForm.role" label="0">管理员</el-radio>
			<el-radio v-model="ruleForm.role" label="1">顾客</el-radio>
			</el-form-item>
			<el-form-item>
			<el-button type="primary" @click="updateUser">确定</el-button>
			<el-button @click="isShow=false">取消</el-button>
			</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: "manage-guest",
		data() {
			return {
				userList: [],
				isShow: false,
				userId: '',
				ruleForm: {
					username: '',
					password: '',
					email: '',
					role: "1"
				}
			}
		},
		created() {
			this.getUserList()
		},
		methods: {
			getUserList() {
				this.axios.get('/user/list')
				.then(res=> {
					this.userList =res;
					this.userList.forEach((value,index,arr)=> {
						if(value.role===0) {
                          arr[index].role = "管理员"
						}else {
							arr[index].role = "顾客"
						}
						arr[index].phone = "正常"
					})
					// console.log(this.userList)
				}).catch(err=> {
					console.log(err)
				})
			},
			//确定添加用户
			updateUser() {
				var hash = this.$md5(this.ruleForm.password);
				this.axios.post("/user/modify",{
					id: this.userId,
					username: this.ruleForm.username,
					//password: this.ruleForm.password,
					password:hash,
					email: this.ruleForm.email,
					role: this.ruleForm.role,
					phone: null,
					question: null,
					answer: null,
					createTime: null,
					updateTime: null
				}).then(res=> {
					console.log(res);
					if(res===undefined) {
						this.$message({
							type: 'success',
							showClose: true,
							message: "修改成功"
						})
                        this.isShow = false
						setTimeout(()=> {
							this.$router.go(0)
						},300)
					}
					// this.$cookie.remove(this.userId)
				}).catch(err=> {
					console.log(err)
				})
			},
			handle(row) {
				this.userId = row.id
			},
			deleteUser() {
                setTimeout(() => {
				this.axios.post("/user/delete",{
				userId: this.userId	
				}).then(res=> {
					if(res) {
						this.$message({
							type: 'success',
							showClose: true,
							message: res
						})

						setTimeout(()=> {
							this.$router.go(0)
						},300)
					}
				}).catch(err=> {
					console.log(err)
				})
				}, 300);

			}
			
		}
	}
</script>

<style lang="scss" scoped>
.el-card{
margin-top:30px;
}

.guest-box{
position: absolute;
width: 500px;
height: 400px;
left: 50%;
top: 50%;
transform: translate(-50%,-50%);
background-color: white;
border: 1px solid grey;
padding: 20px;
}
</style>