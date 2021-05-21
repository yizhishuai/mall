<template>
	<div>
		<el-card>
			<!--table表格-->
			<el-table :data="orderList" border stripe>
				<el-table-column label="订单编号" prop="orderNo"></el-table-column>
				<el-table-column label="订单价格" prop="payment"></el-table-column>
				<el-table-column label="支付类型" prop="paymentType"></el-table-column>
				<el-table-column label="是否付款" prop="status"></el-table-column>
				<el-table-column label="操作" width="200">
					<template v-slot="scope">
						<el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog">编辑</el-button>
						<el-button size="mini" type="success" icon="el-icon-location" @click="showProgressDialog(scope.row)">物流</el-button>
					</template>
				</el-table-column>
			</el-table>

		</el-card>

	</div>
</template>

<script>


	export default {
		name: "manage-order",
		data() {
			return {
				orderList: []
			}
		},
		created() {
			this.getOrderList()
		},
		methods: {
			getOrderList() {
				this.axios.get('/orders/list')
				.then(res=> {
					this.orderList =res;
					this.orderList.forEach((value,index,arr)=> {
						if(value.status===10) {
                          arr[index].status = "已支付"
						}else {
							arr[index].status = "未支付"
						}
						arr[index].paymentType = "支付宝"
					})
					// console.log(this.userList)
				}).catch(err=> {
					console.log(err)
				})
			},
			showEditDialog() {
				
			},
			showProgressDialog() {
				
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	.el-cascader {
		width: 100%;
	}
</style>