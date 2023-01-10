

const styleIdCliente=(identifiacion)=>{
   const idt = identifiacion.toString()
   if (idt.length == 8){
       let idtStyled = idt.slice(0,2) + '.' + idt.slice(2,5) + '.' + idt.slice(5,8)
       return idtStyled
   }else{
       let idtStyled =  idt.slice(0,2) + '-' +idt.slice(2,10)+ '-' + idt.slice(10,11)
       return idtStyled
   }

}   

export default styleIdCliente