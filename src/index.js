export default {
    install(Vue,{optionKeys=['config']}={}){

        Vue.mixin({
            beforeCreate(){
                optionKeys.forEach((optionKey)=>{
                    const config = this.$options[optionKey];
                    if(!config || typeof config !== 'object'){
                        return;
                    }
                    Object.keys(config).forEach((key)=>{
                        const descriptor = Object.getOwnPropertyDescriptor(config,key)
                        if(descriptor.get){
                            Object.defineProperty(this,key,{
                                get:descriptor.get,
                            });
                        }else{
                            Object.defineProperty(this,key,{
                                value:config[key],
                                writable:true,
                            })
                        }
                    })
                });
            }
        })
    }
}