<template>
  <el-card class="introduce">
    <div class="order">
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>用户数量</span>
          </div>
        </template>
        <div class="item">{{userCount}}</div>
      </el-card>
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>商品数量</span>
          </div>
        </template>
        <div class="item">{{productCount}}</div>
      </el-card>
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>订单数量</span>
          </div>
        </template>
        <div class="item">{{orderCount}}</div>
      </el-card>
    </div>
  </el-card>
</template>

<script>

export default {
  name:"manage-dashboard",
  data() {
      return {
        userCount:'',
        productCount:'',
        orderCount:''
        }
      },
  created() {
			this.getData()
		},
		methods: {
			getData() {
        this.axios
        .get("/statistic/base_count")
        .then(res => {
          console.log(res)
         this.userCount = res.userCount,
         this.productCount = res.productCount,
         this.orderCount = res.orderCount
        });
    }
      }
     
				
}
</script>

<style scoped>
  .introduce .order {
    display: flex;
    margin-bottom: 50px;
  }
  .introduce .order .order-item {
    flex: 1;
    margin-right: 20px;
  }
  .introduce .order .order-item:last-child{
    margin-right: 0;
  }
</style>