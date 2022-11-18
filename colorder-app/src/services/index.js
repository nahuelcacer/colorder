const URL_API = "/api/clientes"

export const obtenerClientes = async () => {
    return await fetch(URL_API)
}
