import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { obtenerPedidosPendientes } from "../../services/apiObtenerFunctions";
import { localhost } from "../../services/service.pedidos";
import TableShow from "../tables/TableShow";
import MostrarPedidoFacturacion from "./MostrarPedidoFacturacion";

const Facturacion = () => {
  const [data, setData] = useState([]);
  const [pendientes, setPendientes] = useState(0);
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [preparar, setPreparar] = useState({
    on: false,
    id: "",
    pedido: null,
  });

  const searchParams = new URLSearchParams({
    factura: checked ? 1 : 0,
    cliente: search,
    fecha: fecha.toISOString().slice(0, 10),
    enPreparacion: checked ? "" : 0,
  });

  const fetchData = async () => {
    const { data, cantidad, pendientes } = await obtenerPedidosPendientes(
      searchParams
    );
    setData(data);
    setPendientes(pendientes);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [checked, search, fecha, preparar]);
  useEffect(() => {
    if (pendientes !== 0) {
      document.title = `(${pendientes}) Pendientes`;
    } else {
      document.title = "No hay pedidos pendientes";
    }
  }, [pendientes]);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      {preparar ? (
        <MostrarPedidoFacturacion
          preparar={preparar}
          setPreparar={setPreparar}
        />
      ) : (
        <></>
      )}
      <TableShow
        setPreparar={setPreparar}
        fecha={fecha}
        setFecha={setFecha}
        handleChange={handleChange}
        setChecked={setChecked}
        datos={data}
        titulo="Pedidos"
        nombreSwitch="Facturado"
        subtitulo="Facturas"
      ></TableShow>
    </Container>
  );
};

export default Facturacion;
