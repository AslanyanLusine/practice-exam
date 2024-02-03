
const url = "https://jsonplaceholder.typicode.com/posts"
class Service{
    constructor(){
        
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
        }).catch((err)=> console.log("fetching error",err))

    }

    getGropeddata(key){
        return this.#fetchedData(url).myGroup(key)
    }

}

const first = Service.getInstance()
const second = Service.getInstance()
console.log(first.getGropeddata("id"))






Array.prototype.myGroup = function(keyWord){
    const obj = {};
    for (let x = 0; x < this.length; x++) {
      const key = this[x][keyWord];
      if (obj[key]) {
        obj[key].push(this[x]);
      } else {
        obj[key] = [this[x]];
      }
    }
    return obj;

}


