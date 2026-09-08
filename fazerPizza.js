function fazerPizzas(sabor) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
             resolve(`Pizza de ${sabor} pronta :)`)
        }, 5000);       
    }
    )
}

export async function pedirPizzas() {
    console.log('Pedido enviado para a cozinha')    
    try {
        const pedidoDaPizza = await fazerPizza ('Frango Catupiry')
        
    console.log(`Finalmente chagou, ${pedidoDaPizza}`)
    } catch (error) {
console.log(`Deu ruim: ${error.message}`)
    
        
    }
}
