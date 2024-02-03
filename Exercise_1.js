
const url = "https://jsonplaceholder.typicode.com/posts"
class Service{
    constructor(data){
        this.data = data
    }
    static getInstance(){
        if(!Service.instance){
            Service.instance = new Service()
        }
        return Service.instance
    }


    #fetchedData(url){
        fetch(url).then((response => {
            return response.json()
        })).then(data => {
            return data
        })

    }

    getGropeddata(key){
        return this.#fetchedData(url).myGroup(key)
    }

}

const first = Service.getInstance()
const second = Service.getInstance()
console.log(first.fetchedData(url))



console.log()




Array.prototype.myGroup = function(key){
    const obj = {}
    for(let i = 0; i < this.length; i++){
        if(this[i].key === key){
            obj[key] = {...obj}
        }
    }
    return obj

}
