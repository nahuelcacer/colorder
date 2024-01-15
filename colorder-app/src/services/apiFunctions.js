import { localhost } from "./service.pedidos";

export const actualizarEstadoPedidoEnPreparacionFalse = async (id) => {
    try {
        const response = await fetch(`${localhost}api/pedidopost/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'enPreparacion': false}),
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el estado del pedido: ${response.statusText}`);
        }

        // Manejar la respuesta si es necesario
        const data = await response.json();
        
        // Puedes retornar la respuesta del servidor si lo necesitas
        return data;
    } catch (error) {
        console.error('Error en la solicitud PUT:', error.message);
        // Manejar el error según sea necesario
    }


};

export const actualizarEstadoPedidoEnPreparacionTrue = async (id) => {
        try {
            const response = await fetch(`${localhost}api/pedidopost/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'enPreparacion': true}),
            });
    
            if (!response.ok) {
                throw new Error(`Error al actualizar el estado del pedido: ${response.statusText}`);
            }
    
            // Manejar la respuesta si es necesario
            const data = await response.json();
    
            // Puedes retornar la respuesta del servidor si lo necesitas
            return data;
        } catch (error) {
            console.error('Error en la solicitud PUT:', error.message);
            // Manejar el error según sea necesario
        }

};


export const actualizarEstadoPedidoEnFacturaTrue = async (id) => {
    try {
        const response = await fetch(`${localhost}api/pedidopost/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'factura': true}),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar el estado del pedido: ${response.statusText}`);
        }

        // Manejar la respuesta si es necesario
        const data = await response.json();

        // Puedes retornar la respuesta del servidor si lo necesitas
        return data;
    } catch (error) {
        console.error('Error en la solicitud PUT:', error.message);

    }
}

export const actualizarEstadoPedidoEnReciboTrue = async (id) => {
    try {
        const response = await fetch(`${localhost}api/pedidopost/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'recibo': true}),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar el estado del pedido: ${response.statusText}`);
        }

        // Manejar la respuesta si es necesario
        const data = await response.json();

        // Puedes retornar la respuesta del servidor si lo necesitas
        return data;
    } catch (error) {
        console.error('Error en la solicitud PUT:', error.message);

    }
}

