import { createAction } from '@reduxjs/toolkit'


// SELECCIONAR CLIENTE EN EL BUSCADOR
export const selectCliente = createAction('cliente/seleccionar', function prepare(cliente){
  return {
    payload:{
      cliente
    }
  }
})
// AGREGAR ITEM EN EL PEDIDO/CARRITO
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

export const backtoInitialState = createAction('item/initialState', function prepare(item){
  return {
    payload:
      item
  }
})