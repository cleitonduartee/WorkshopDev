const db = require("../../db");

function onOff(){
        document.querySelector("#modal").classList
        .toggle("hiden")  
        
        document.querySelector("body").classList
        .toggle("hideScroll")

        document.querySelector("#modal").classList
        .toggle("addScroll")
}

function validador(event){

     console.log(event);
}
function excluir(event){

   

        db.run(`DELETE FROM ideas WHERE id = ?`,[event], function(err){
                        if(err) return console.log(err)
                
                        console.log("Deletei", this)
                    });
                
}