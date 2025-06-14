let mysql = require("mysql");

let conecction = mysql.createConnection({
  hostname: "localhost",
  database: "tienda_cafe",
  user: "root",
  password: "1234567890"

});

conecction.connect(function(error){
  if(error){
      throw error;
  }else{
    console.log("Conecction sucessful");
  }
});

//connection.end();