import { createAction } from '@reduxjs/toolkit'

export const selectCliente = createAction('cliente/seleccionar', function prepare(cliente){
  return {
    payload:{
      cliente
    }
  }
})

console.log(selectCliente('Write more docs'))

export const agregarItem = createAction('item/agregar', function prepare(item){
  return {
    payload:
      item
  }
})
export const eliminarItem = createAction('item/eliminar', function prepare(item){

  return {
    payload:
      item
  }
})