import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { actualizarEstadoPedidoEnReciboTrue } from "../../services/apiFunctions";
import getTotalCost from "../../tools/getTotalCost";
import styleIdCliente from "../../tools/styleIdentificacion";

const TableShowRecibo = ({
  setButtonClicked,
  datos,
  titulo,
  subtitulo,
  search,
  handleChange,
  setFecha,
  fecha,
  setAlignment,
  alignment,
}) => {
  const hanledChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };
  const Recibir = (id) => {
    actualizarEstadoPedidoEnReciboTrue(id);
    setButtonClicked(true)
  };

  return (
    <Table>
      <TableHead>
        {/* TITULO Y SUBTITULO */}
        <TableRow>
          <TableCell colSpan={5}>
            <Typography variant="h6">{titulo}</Typography>
            <Typography color={"grey"}>{subtitulo}</Typography>
          </TableCell>
        </TableRow>
        {/* BUSCADOR Y SWITCHERS */}
        <TableRow>
          <TableCell colSpan={2}>
            <TextField
              sx={{
                backgroundColor: "#f0f0f0",
                width: "100%",
                borderRadius: "8px",
              }}
              id="standard-basic"
              placeholder="Buscar pedido"
              variant="standard"
              onChange={handleChange}
              value={search}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </TableCell>
          <TableCell>
            <ToggleButtonGroup
              sx={{ ml: 5, padding: 0 }}
              color="primary"
              value={alignment}
              exclusive
              onChange={hanledChange}
              aria-label="Platform"
            >
              <ToggleButton value="con">
                <CheckIcon />
              </ToggleButton>
              <ToggleButton value="sin">
                <CloseIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </TableCell>
          <TableCell>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Seleccione una fecha"
                value={fecha}
                onChange={(newValue) => {
                  setFecha(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {datos.map((pedido) => {
          return (
            <TableRow key={pedido.id}>
              <TableCell align="center" sx={{ padding: 1 }}>
                <Typography>
                  <strong>{pedido.orden}</strong>
                </Typography>
                <Typography variant="overline" color={"grey"}>
                  {pedido.fecha}
                </Typography>
                <div>
                  <Typography variant="caption" color={"grey"}>
                    {" "}
                    {pedido.tiempo.substr(0, 5)} hs
                  </Typography>
                </div>
                {pedido.factura ? (
                  <Chip label="Facturado" size="small" color="success" />
                ) : (
                  <></>
                )}
              </TableCell>
              <TableCell align="center" sx={{ padding: 0 }}>
                <Typography>
                  <strong>{pedido.cliente.nombre}</strong>
                </Typography>
                <Typography>{styleIdCliente(pedido.cliente.dni)}</Typography>
                {pedido.cliente.escribano ? (
                  <Chip
                    label="Esc"
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ) : (
                  <></>
                )}
              </TableCell>
              <TableCell align="center" sx={{ padding: 0 }}>
                <Typography>
                  <strong>
                    {getTotalCost(pedido.orderproduct).toLocaleString("es-ar", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    })}
                  </strong>
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ padding: 0 }}>
                {pedido.recibo ? (
                  <></>
                ) : (
                  <Button
                    onClick={(e) => {
                      Recibir(pedido.id);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Recibido
                  </Button>
                )}
              </TableCell>
              <TableCell align="center" sx={{ padding: 0 }}>
                <Tooltip
                  title={
                    <>
                      {pedido.orderproduct.map((item) => {
                        return <span>{item.producto.nombre}</span>;
                      })}
                    </>
                  }
                >
                  <span>
                    <InfoOutlinedIcon></InfoOutlinedIcon>
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableShowRecibo;
