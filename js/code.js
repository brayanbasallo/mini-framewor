class PlatziReactive {
    constructor(options) {
        this.origen = options.data()


        //destino
        this.$data = new Proxy(this.origen, {
            get(target, name) {
                if (Reflect.has(target, name)){
                    // return target[name]
                    Reflect.get(target, name)
                }
                console.error(`La propiedad ${name} no existe`)
                return ""
            },
            set(target, name, value){
                console.log(target, name , value)

            }
        })
    }

    mount(){
        document.querySelectorAll("*[p-text]").forEach(el=>{
            this.pText(el, this.$data, el.getAttribute("p-text"));
        })
        document.querySelectorAll("*[p-model]").forEach(el=>{
            const NAME = el.getAttribute("p-model")
            this.pModel(el, this.$data, NAME)

            el.addEventListener("input", ()=>{
                //this.$data[NAME] = el.value
                Reflect.set(this.$data, NAME, el.value)
            })
        })
    }

    pText(el, target, name){
        el.innerText = Reflect.get(target, name);
    }
    pModel(el, target, name){
        el.value = Reflect.get(target, name)
    }
}

var platzi = {
    createApp(options) {
        return new PlatziReactive(options)
    }
}