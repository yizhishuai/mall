<template>
  <div >
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="商品名称" prop='name'>
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="子标题">
    <el-input v-model="form.subtitle"></el-input>
  </el-form-item>
  <el-form-item label="商品分类">
    <el-select v-model="form.region" placeholder="请选择商品分类">
      <el-option label="手机" value="100001"></el-option>
      <el-option label="平板" value="100002"></el-option>
      <el-option label="电脑" value="100003"></el-option>
    </el-select>
  </el-form-item>
 
  <el-form-item label="图片url">
    <el-input v-model="form.main_imgae"></el-input>
  </el-form-item>

  <el-form-item label="价格">
    <el-input v-model="form.price"></el-input>
  </el-form-item>

  <el-form-item label="库存量">
    <el-input v-model="form.stock"></el-input>
  </el-form-item>

  <el-form-item label="上架">
    <el-switch v-model="form.status"></el-switch>
  </el-form-item> 

  <el-form-item>
    <el-button type="primary" @click="addProduct">添加</el-button>
     <button class="manage-add-button" type="reset">取消</button>
  </el-form-item>
 <!-- categoryId=1&name=三星洗衣机&subtitle=三星大促销&mainImage=sss.jpg&subImages=test.jpg&detail=detailtext&price=1000&stock=100&status=1&id=3 -->
</el-form>
  </div>
</template>
<script>
  export default {
    name:"manege-add",
    data() {
      return {
        form: {
          name: '',
          subtitles:'',
          region: '',
          main_imgae: '',
          price:'',
          stock:'',
          status: true,
        }
      }
    },
    methods: {
      addProduct() {
        
        this.axios.post('/products/save',{
           categoryId: this.form.region,
           name: this.form.name,
           subtitle: this.form.subtitle,
           mainImage: this.form.main_imgae,
           subImages: this.form.main_imgae,
           detail: null,
           price: this.form.price,
           stock: this.form.stock,
           status: this.form.status===true?1:0,

        }).then(res=> {
          console.log(res)
        }).catch(err=> {
          console.log(err)
        })
      }
    }
      
    
  }
</script>
<style lang="scss" scoped>
.manage-add-button{
  width: 100px;
  height: 40px;
  margin-left: 40px;
  background-color: white;
  border:1px solid #409EFF;
  cursor: pointer;
}

.manage-add-button:hover{
  background-color: #409EFF;
}

</style>