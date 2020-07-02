const fs = require("fs");

const filePath = "./data/data.txt"
const read = () => {
  try {
    let text = fs.readFileSync(filePath, "utf8");
    return JSON.parse(text);
  } catch(err) {
      console.log(err);
  }    
}
const write = data => {
  // console.log("write data => ",data)
  fs.writeFile(filePath, JSON.stringify(data), "utf8", err => {
      if(err) console.error(err);
  });
}
class DataStore {
  
  static async get(name=null) {
    // console.log("get name => ",name)
    let data = await read();
    if(data) {
      if(name) {
        // console.log("get name => ",name,data)
        const foundData = data["items"].find(e => e.name == name);
        // console.log('foundData => ',foundData)
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
    // console.log("----------------------------------------")
    //   console.log("patch => ",fromName, toName,price)
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
    console.log("////////////////////////////////////////")
    console.log("delete data=>",data,name)
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