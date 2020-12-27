 //混入 得出$story
 export default function mixin(_vue) {
     //利用混入给$store赋值
     _vue.mixin({
         beforeCreate() {
             const options = this.$options;
             if (options.store) {
                 //Vue根实例
                 this.$store = options.store;
             } else {
                 //非 根实例
                 if (options.parent && options.parent.$store) {
                     this.$store = options.parent.$store;
                 }
             }
         }
     })
 }