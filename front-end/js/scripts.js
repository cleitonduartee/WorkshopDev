
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

async function excluir(id){
         
        console.log(id)   
        
         fetch(`http://localhost:3000/ideias/${id}`, {
                  method: 'DELETE',
                })
                .then((res)=> { 
                        if(res = "ok"){
                                window.location.reload()  
                                alert("Excluido!") 
                        }else{
                                alert("ERRO")
                        }
                });
                         
                                    
}

function validar(event){
        const ValoresCampos = [
                "title",
                "category",
                "img",
                "description",
                "link"                
        ]
        const isEmpty = ValoresCampos.find((value)=>{
               const checkIfIsString = typeof event.target[value].value ==="string";
               const checkIfIsEmpty = !event.target[value].value.trim()

               if(checkIfIsEmpty && checkIfIsString){
                    return true   
               }
        });
       if(isEmpty){
                event.preventDefault();
               alert("por favor, preencha todos os campos!")
       }
}