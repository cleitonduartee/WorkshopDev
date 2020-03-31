/**OBS: instalar o nodemon (npm i nodemon) e no package.js alterar o script 'Start'para iniciar com nodemon */


//usei o express para criar e configurar meu servidor

const express = require("express");
const server = express();
const db = require("./db")


//configurar arquivos static 
server.use(express.static("front-end"));

server.use(express.urlencoded({ extended: true }));

//configuração do nunjucks (Instalado para ter a possibilidade de criar variavei que comunique com server e html)  --- npm i nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {         //---Passado 2 parametros: 1-a pasta onde vai ficar os arquivos Html. 2- objeto de configuração (express vai ser o server)
    express: server,     
    noCache: true,               
});

//criei uma rota
server.get("/", function(request, response){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err) {
            console.log(err)
            return response.send("Erro no Banco de Dados!")
        }

        const revertIdeas = [...rows].reverse();

        const lastIdeas = []
        for(idea of revertIdeas){
            if(lastIdeas.length<2){
                lastIdeas.push(idea);
            }
        }
        return response.render("index.html", { ideas: lastIdeas });
    })
    
    
    
    

})

server.get("/ideias", function(request, response){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err) {
            console.log(err)
            return response.send("Erro no Banco de Dados!")
        }

        const revertIdeas = [...rows].reverse();

        return response.render("ideias.html", {ideas: revertIdeas}); /**_dirname carrega a pasta */
    })

});

server.post("/", function(request, response){  

        const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
 `  
    const values = [

       request.body.image,
       request.body.title,
       request.body.category,
       request.body.description,
       request.body.link,

]
    
    db.run(query, values, function(err){
        if(err) {
            console.log(err)
            return response.send("Erro no Banco de Dados!")
        }
        return response.redirect("/ideias")
        
    })

})

//liguei o servidor na porta 3000
server.listen(3000)

console.log(__dirname + "/index.html")