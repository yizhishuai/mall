<template>
  <div>
    <!--卡片视图区域-->
    <el-card>
      <!--添加分类按钮-->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!-- Element 树形列表 -->

      <ul class="categoryBox">
        <li v-for="(item1, index1) in categoryArr" :key="index1">
          <div
            style="width: 100%; height: 300px; border-bottom: 1px solid black"
          >
            <span>{{ item1.id }}</span>
            <span>{{ item1.name }}</span>
            <div
              v-for="(item2, index2) in item1.subCategories"
              :key="index2"
              style="background-color: pink"
            >
              <span>{{ item2.id }}</span>
              <span>{{ item2.name }}</span>
              <div
                v-for="(item3, index3) in item2.subCategories"
                :key="index3"
                style="background-color: lightblue"
              >
                <span>{{ item3.id }}</span>
                <span>{{ item3.name }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </el-card>

    <!--添加分类的对话框-->
    <el-dialog
      title="添加分类"
      width="50%"
      :visible.sync="addCateDialogVisible"
      :close-on-click-modal="false"
      @close="addCateDialogClosed"
    >
      <!--内容主体-->
      <el-form
        :model="addCateForm"
        ref="addCateFormRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父类id" prop="parent_id">
          <el-input v-model="addCateForm.parent_id"></el-input>
        </el-form-item>
      </el-form>
      <!--底部-->
      <span slot="footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑分类的对话框-->
    <el-dialog
      title="编辑分类"
      width="50%"
      :visible.sync="editCateDialogVisible"
      :close-on-click-modal="false"
      @close="editCateDialogClosed"
    >
      <!--内容主体-->
      <el-form
        :model="editCateForm"
        :rules="editCateFormRules"
        ref="editCateFormRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <!--底部-->
      <span slot="footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "manage-category",
  data() {
    return {
      categoryArr: null,
      //添加分类对话框显示状态
      addCateDialogVisible: false,
      //添加分类的表单数据对象
      addCateForm: {
        cat_name: "",
        parent_id: "",
      },
      //父级分类的列表
      parentCateList: [],
      //指定级联选择器的配置对象
      cascaderProps: {
        expandTrigger: "hover",
        //设置为可选中一级分类
        checkStrictly: true,
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      //选中的父级分类的id数组
      selectedKeys: [],
      //编辑分类的对话框显示状态
      editCateDialogVisible: false,
      //编辑分类的表单数据对象
      editCateForm: {
        cat_id: 0,
        cat_name: "",
      },
      editCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      //获取分类列表的参数对象
      queryInfo: {
        type: 3,
        pagenum: 1, //当前的页数
        pagesize: 5, //当前每页显示多少条数据
      },
      //商品分类的数据列表
      cateList: [],
      //总数据条数
      total: 0,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          //将当前列定义为模板列
          type: "template",
          //模板名称
          template: "isok",
        },
        {
          label: "排序",
          //将当前列定义为模板列
          type: "template",
          //模板名称
          template: "order",
        },
        {
          label: "操作",
          //将当前列定义为模板列
          type: "template",
          //模板名称
          template: "opt",
        },
      ],
    };
  },
  created() {
    this.getCateList();
    this.getAllCategory();
  },
  methods: {
    //获取商品分类数据
    getAllCategory() {
      this.axios
        .get("/categories")
        .then((res) => {
          console.log(res);
          this.categoryArr = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCateList() {
    //   this.axios
    //     .get("/category/get_category")
    //     .then((response) => {
    //       const res = response.data;

    //       console.log(res);
    //       this.cateList = res;
    //     })
    //     .catch(() => {
    //       this.$message.error("请求失败");
    //     });
    },

    //显示添加分类对话框
    showAddCateDialog() {
      this.getParentCateList();
      this.addCateDialogVisible = true;
    },
    //获取父级分类的数据列表
    getParentCateList() {
      this.axios
        .get("categories", { params: { type: 2 } })
        .then((response) => {
          const res = response.data;
          if (res.meta.status === 200) {
            this.parentCateList = res.data;
          } else {
            this.$message.error(res.meta.msg);
          }
        })
        .catch(() => {
          this.$message.error("请求失败");
        });
    },
    //选择项发生变化
    parentCateChange() {
      //如果 selectedKeys 数组中的 length 大于0 则选中了父级分类，否则为没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        //父级分类的id
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ];
        //当前添加的分类等级
        this.addCateForm.cat_level = this.selectedKeys.length;
      } else {
        //父级分类的id
        this.addCateForm.cat_pid = 0;
        //当前添加的分类等级
        this.addCateForm.cat_level = 0;
      }
    },
    //监听添加分类对话框关闭事件
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields();
      this.selectedKeys = [];
      this.addCateForm.cat_pid = 0;
      this.addCateForm.cat_level = 0;
    },
    //确定添加分类
    addCate() {
      this.axios
        .post("/category/add_category", {
          parentId: this.addCateForm.parent_id,
          categoryName: this.addCateForm.cat_name,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showEditDialog(cateInfo) {
      this.editCateForm.cat_id = cateInfo.cat_id;
      this.editCateForm.cat_name = cateInfo.cat_name;
      this.editCateDialogVisible = true;
    },
    //监听修改分类对话框关闭事件
    editCateDialogClosed() {
      this.$refs.editCateFormRef.resetFields();
      this.editCateForm.cat_id = 0;
      this.editCateForm.cat_name = "";
    },
    //确定修改分类
    editCate() {
      this.$refs.editCateFormRef.validate((valid) => {
        if (valid) {
          this.axios
            .put(`categories/${this.editCateForm.cat_id}`, {
              cat_name: this.editCateForm.cat_name,
            })
            .then((response) => {
              const res = response.data;
              if (res.meta.status === 200) {
                this.$message.success(res.meta.msg);
                this.getCateList();
                this.editCateDialogVisible = false;
              } else {
                this.$message.error(res.meta.msg);
              }
            })
            .catch(() => {
              this.$message.error("操作失败");
            });
        }
      });
    },
    removeCateById(id) {
      this.axios
        .delete(`categories/${id}`)
        .then((response) => {
          const res = response.data;
          if (res.meta.status === 200) {
            this.$message.success(res.meta.msg);
            this.getCateList();
          } else {
            this.$message.error(res.meta.msg);
          }
        })
        .catch(() => {
          this.$message.error("操作失败");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.treeTable {
  margin-top: 15px;
  margin-bottom: 15px;
}

.el-cascader {
  width: 100%;
}
.el-button {
  margin-right: 10px;
}
.categoryBox {
  widows: 100%;
  height: 2000px;
  border: 1px solid black;
}
</style>