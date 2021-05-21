<template>
  <div>
    <el-card>
      <!--table表格-->
      <el-button type="btn btn-success" style="margin-bottom: 20px"
        >添加商品</el-button
      >
      <el-table :data="productList" border stripe>
        <el-table-column label="商品种类id" prop="categoryId"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="商品子标题" prop="subtitle"></el-table-column>
        <el-table-column label="商品主图">
          <template scope="scope">
            <img
              :src="scope.row.mainImage"
              width="40"
              height="40"
              class="mainImage"
            />
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="金额" prop="price"></el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="isShow = true"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="success"
              icon="el-icon-location"
              @click="deleteGood(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      
      <div class="container">
      <div class="wrap" v-for="(order,index) in list" :key="index">
        <div class="header">
          <div class="title">
            {{order.createTime}}
            <span>|</span>
            {{order.receiverName}}
            <span>|</span>
            订单号：{{order.orderNo}}
            <span>|</span>
            {{order.paymentTypeDesc}}
          </div>
          <div class="pay">
            应付金额：
            <span>{{order.payment}}</span>
            元
          </div>
        </div>
        <div class="order-content clearfix">
          <div class="good-box fl">
            <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
              <div class="good-img">
                <img :src="item.productImage" alt />
              </div>
              <div class="good-name">
                <div class="p-name">{{item.productName}}</div>
                <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
              </div>
            </div>
          </div>
          <div class="good-state fr" v-if="order.status == 20">
            <a href="javascript:;">{{order.statusDesc}}</a>
          </div>
          <div class="good-state fr" v-else>
            <a href="javascript:;" @click="goPay(order.orderNo)">待支付</a>
            <!--  <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a> -->
          </div>
        </div>
      </div>
      
      <el-pagination
        class="pagination"
        :pageSize="pageSize"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handelchange"
      ></el-pagination>
    </div>

      <div class="guest-box" v-show="isShow">
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="名称" prop="name">
            <el-input
              type="text"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="子标题" prop="subtitle">
            <el-input
              type="text"
              v-model="ruleForm.subtitle"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input type="number" v-model="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-input type="number" v-model="ruleForm.stock"></el-input>
          </el-form-item>
          <el-form-item label="主图" prop="mainImage">
            <el-input type="text" v-model="ruleForm.mainImage"></el-input>
          </el-form-item>
          <el-form-item label="子图" prop="subImages">
            <el-input type="text" v-model="ruleForm.subImages"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateGood">确定</el-button>
            <el-button @click="isShow = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "manage-good",
  data() {
    return {
      productList: [],
      isShow: false,
      ruleForm: {
        name: "",
        subtitle: "",
        price: "",
        stock: "",
        mainImage: "",
        subImages: "",
      },
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    getProductList() {
      this.axios
        .get("/products/list")
        .then((res) => {
          console.log(this.res);
          this.productList = res;
          this.productList.forEach((value, index, arr) => {
            arr[index].status = "上架";
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteGood() {},
    updateGood() {
     
    },
  },
};
</script>

<style lang="scss" scoped>
.el-steps .el-step {
  flex-basis: 16.6667% !important;
}

.el-checkbox {
  margin: 0 10px 0 0 !important;
}

.previewImg {
  width: 100%;
}

.btnEdit {
  margin-top: 15px;
}
.guest-box {
  position: absolute;
  width: 500px;
  height: 500px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid grey;
  padding: 20px;
}
</style>