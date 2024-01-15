import { localhost } from "./service.pedidos";

export const obtenerPedidosPendientes = async (searchParams) => {
    try{
        const response = await fetch(`${localhost}api/pedidopost?${searchParams}`)

        if (!response.ok) {
            throw new Error(`Error al obtener todos los pedidos: ${response.statusText}`);
        }

        // Manejar la respuesta si es necesario
        const data = await response.json();
        
        // Puedes retornar la respuesta del servidor si lo necesitas
        return data;
    }
    catch(err){
        console.error('Error al obtener todos los pedidos pendientes', err)
    }
}