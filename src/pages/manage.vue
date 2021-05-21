<template>
	<div class="container">
		<manage-header title="订单管理">
			<template v-slot:tips>
				<span>管理员订单管理页面</span>
			</template>
		</manage-header>
		<div class="layout">
			<el-aside class="aside">
				<el-menu :default-openeds="['1']">
					<el-submenu index="1">
						<el-menu-item-group>
							<el-menu-item @click="num=1"><i class="el-icon-odometer" />Dashboard</el-menu-item>
							<el-menu-item @click="num=3"><i class="el-icon-menu" />分类管理</el-menu-item>
							<el-menu-item @click="num=4"><i class="el-icon-s-goods" />商品管理</el-menu-item>
							<el-menu-item @click="num=5"><i class="el-icon-user-solid" />用户管理</el-menu-item>
							<el-menu-item @click="num=6"><i class="el-icon-s-order" />订单管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container class="content">
				<div class="main" v-show="num===1">
                   <manage-dashboard></manage-dashboard>
				</div>
				
				
				<div class="main" v-show="num===3">
					<manage-category></manage-category>
				</div>
				<div class="main" v-show="num===4">
					<manage-good></manage-good>
				</div>
				<div class="main" v-show="num===5">
					<manage-guest></manage-guest>
					
					<div class="guest-box">
						
					</div>
				</div>
				<div class="main" v-show="num===6">
					<manage-order></manage-order>
				</div>
			</el-container>
		</div>


	</div>

</template>

<script>
	import ManageHeader from "./../components/ManageHeader";
	import ManageCategory from "../views/ManageCategory.vue"
	import ManageDashboard from "../views/ManageDashboard.vue"
	import ManageGood from "../views/ManageGood.vue"
	import ManageGuest from "../views/ManageGuest.vue"
	import ManageOrder from "../views/ManageOrder.vue"
	// import NoData from "./../components/NoData";
	//import infiniteScroll from "vue-infinite-scroll";
	export default {
		name: "manage",
		components: {
			ManageHeader,
			ManageCategory,
			ManageDashboard,
			ManageGood,
			ManageGuest,
			ManageOrder
			// NoData,
		},
		//directives: { infiniteScroll },
		data() {
			return {
				num: 1
			}
		},


	}
</script>

<style lang="scss">
	@import "./../assets/scss/config.scss";
	@import "./../assets/scss/mixin.scss";
	@import "./../assets/scss/base.scss";

	.layout {
		background-color: #ffffff;

		.aside {
			width: 200px !important;
			background-color: #222832;
			overflow: hidden;
			overflow-y: auto;
			-ms-overflow-style: none;
			float: left;
			overflow: -moz-scrollbars-none;

			.el-menu {
				border-right: none !important;

				.el-submenu {
					border-top: 1px solid hsla(0, 0%, 100%, .05);
					border-bottom: 1px solid rgba(0, 0, 0, .2);
					font-weight: bold
				}
			}
		}

		.content {
			margin-left: 210px;
			display: flex;
			flex-direction: column;
			max-height: 100vh;
			overflow: hidden;

			.main {
				height: calc(100vh - 100px);
				overflow: auto;
				padding: 10px;
			}
		}
	}
</style>
