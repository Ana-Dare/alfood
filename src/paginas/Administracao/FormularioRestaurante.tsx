import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../interfaces/IRestaurante";
import http from "../../http";

const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(
          `http://0.0.0.0:8000/api/v2/restaurantes/${parametros.id}/`
        )
        .then((res) => setNomeRestaurante(res.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("restaurante atualizado com sucesso");
        });
    } else {
      http
        .post("http://0.0.0.0:8000/api/v2/restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("restaurante cadastrado com sucesso");
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography variant="h6">Formulário de Restaurantes</Typography>
        <Box component="form" sx={{ width: 100 }} onSubmit={aoSubmeterForm}>
          <TextField
            value={nomeRestaurante}
            onChange={(evento) => setNomeRestaurante(evento.target.value)}
            id="standard-basic"
            label="Nome do restaurante"
            variant="standard"
            fullWidth
            required
          />
          <Button
            sx={{ marginTop: 1 }}
            type="submit"
            variant="outlined"
            fullWidth
          >
            Outlined
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormularioRestaurante;
