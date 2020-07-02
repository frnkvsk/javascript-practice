
const read = () => {
  return {"items":[{"name":"hammer","price":19.99}]};     
}
const write = data => {
  // do nothing
}
class DataStore {
  
  static async get(name=null) {
    
    let data = await read();
    if(data) {
      if(name) {
        const foundData = data["items"].find(e => e.name == name);
        return foundData;
      }
      return data;
    } else {
      return null;
    }
    
  }

  static async post(item) {
    let data = await read();
    if(data) {
      data["items"].push(item);
      write(data);
    } else {
      let obj = {
        "items": [
          {
            "name": item.name,
            "price": item.price
          }
        ]
      }
      write(obj);
    }
  }

  static async patch(fromName, toName, price) {
    let data = await read();
    if(data && data["items"].some(e => e.name==fromName)) {
      let foundItem = {};
      data["items"] = data["items"].map(e => {
        if(e.name == fromName) {
          e.name = toName;
          e.price = price;
          foundItem["name"] = toName;
          foundItem["price"] = price;
        }
        return e; 
      });
      write(data);
      
      return foundItem;
    } else {
      return false;
    }
  }

  static async delete(name) {
    let data = await read();
    if(data && data["items"].some(e => e.name==name)) {
      data["items"] = data["items"].filter(e => e.name != name);
      write(data);
      return true;
    } else {
      return false;
    }
  }
}

module.exports = DataStore;