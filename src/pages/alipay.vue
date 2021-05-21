<template>
    <div class="ali-pay">
        <order-header title="订单支付">
            <template v-slot:tips>
                <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
            </template>
        </order-header>
       
        <div class="form" v-html="content"></div>
    </div>
</template>

<script>
    import OrderHeader from './../components/OrderHeader';
 
    export default {
        name: 'alipay',
        data() {
            return {
                orderId: this.$route.query.orderId,      //订单号
                content: '',     //支付宝页面html源码
               
            }
        },
        components: {
            OrderHeader,
          
        },
        mounted() {
            this.submitPay()
        },
        methods: {
            submitPay() {
                this.axios.post('http://mall-pre.springboot.cn/api/pay', {
                    orderId: this.orderId,
                    orderName: '数码产品电商平台',
                    amount: 0.01,
                    payType: 1,
                }).then((res) => {
                    this.content = res.content
                    setTimeout(()=>{
                        document.forms[0].submit();     //提交第一个表单数据，跳转到支付宝页面
                    },100)
                })
            }
        },
    }
</script>