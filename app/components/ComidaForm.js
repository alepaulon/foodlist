"use client";

import React, { useState, useEffect } from "react";

const ComidaForm = () => {
  const [nombre, setNombre] = useState("");
  const [ingredientes, setIngredientes] = useState([""]);
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [comidasGuardadas, setComidasGuardadas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const ingredientesDisponiblesGuardados = JSON.parse(
      localStorage.getItem("ingredientesDisponibles")
    );
    if (ingredientesDisponiblesGuardados) {
      setIngredientesDisponibles(ingredientesDisponiblesGuardados);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "ingredientesDisponibles",
      JSON.stringify(ingredientesDisponibles)
    );
    verificarComidasDisponibles();
  }, [ingredientesDisponibles]);

  useEffect(() => {
    const comidasGuardadas = JSON.parse(localStorage.getItem('comidas'));
    if (comidasGuardadas) {
      setComidas(comidasGuardadas);
      setComidasGuardadas(comidasGuardadas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comidas', JSON.stringify(comidasGuardadas));
  }, [comidasGuardadas]);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleIngredienteChange = (event, index) => {
    const nuevosIngredientes = [...ingredientes];
    nuevosIngredientes[index] = event.target.value;
    setIngredientes(nuevosIngredientes);
  };

  const handleAgregarIngrediente = () => {
    setIngredientes([...ingredientes, ""]);
  };

  const handleEliminarIngrediente = (index) => {
    const nuevosIngredientes = [...ingredientes];
    nuevosIngredientes.splice(index, 1);
    setIngredientes(nuevosIngredientes);
  };

  const handleAgregarIngredienteDisponible = (event) => {
    event.preventDefault();
    if (!ingredientesDisponibles.includes(nombre)) {
      setIngredientesDisponibles([...ingredientesDisponibles, nombre]);
      setNombre("");
    }
  };

  const handleEliminarIngredienteDisponible = (index) => {
    const nuevosIngredientesDisponibles = [...ingredientesDisponibles];
    nuevosIngredientesDisponibles.splice(index, 1);
    setIngredientesDisponibles(nuevosIngredientesDisponibles);
    verificarComidasDisponibles();
  };

  const verificarComidasDisponibles = () => {
    const comidasDisponibles = comidas.map((comida) => {
      const ingredientesDisponiblesParaComida = comida.ingredientes.every(
        (ingrediente) => ingredientesDisponibles.includes(ingrediente)
      );
      return { ...comida, disponible: ingredientesDisponiblesParaComida };
    });

    if (!comidasDisponibles.some((comida) => comida.disponible)) {
      setError("Faltan ingredientes para realizar las comidas");
    } else {
      setError("");
    }

    setComidas(comidasDisponibles);
  };

  const handleAgregarComida = () => {
    const nuevaComida = {
      nombre: nombre,
      ingredientes: ingredientes,
    };

    const nuevasComidasGuardadas = [...comidasGuardadas, nuevaComida];
    setComidas(nuevasComidasGuardadas);
    setComidasGuardadas(nuevasComidasGuardadas);

    setNombre('');
    setIngredientes(['']);
  };

  const handleEliminarComida = (index) => {
    const nuevasComidasGuardadas = [...comidasGuardadas];
    nuevasComidasGuardadas.splice(index, 1);
    setComidas(nuevasComidasGuardadas);
    setComidasGuardadas(nuevasComidasGuardadas);
  };

  return (
    <div>
      <div>
        <div className="flex flex-row justify-around">
          <form
            onSubmit={handleAgregarComida}
            className="flex flex-col items-center"
          >
            <h2 className="text-[#abd1c6] font-medium text-xl">
              Comida nueva:
            </h2>
            <input
              className="rounded-full p-2 m-2 mt-4"
              type="text"
              id="nombre"
              value={nombre}
              onChange={handleNombreChange}
              required
            />
            {ingredientes.map((ingrediente, index) => (
              <div className="flex flex-col items-center" key={index}>
                <label
                  className="text-[#e8e4e6] p-2"
                  htmlFor={`ingrediente-${index}`}
                >
                  Ingrediente {index + 1}:
                </label>
                <input
                  className="rounded-full p-2 m-2"
                  type="text"
                  id={`ingrediente-${index}`}
                  value={ingrediente}
                  onChange={(event) => handleIngredienteChange(event, index)}
                  required
                />
                {index > 0 && (
                  <button
                    className="bg-[#e16162] text-[#001e1d] rounded-full px-2 m-2"
                    type="button"
                    onClick={() => handleEliminarIngrediente(index)}
                  >
                    Eliminar Ingrediente
                  </button>
                )}
              </div>
            ))}
            <button
              className="bg-[#f9bc60] text-[#001e1d] rounded-full px-2 m-2"
              type="button"
              onClick={handleAgregarIngrediente}
            >
              +
            </button>

            <button
              className="bg-[#f9bc60] text-[#001e1d] rounded-full px-2 m-2"
              type="submit"
            >
              Agregar Comida
            </button>
          </form>
          <div className="flex flex-col items-center">
            <h2 className="text-[#abd1c6] font-medium text-xl">
              Ingrediente nuevo:
            </h2>
            <form
              onSubmit={handleAgregarIngredienteDisponible}
              className="flex flex-col"
            >
              <input
                className="rounded-full p-2 m-2 mt-4"
                type="text"
                id="nombreIngrediente"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                required
              />
              <button
                className="bg-[#f9bc60] text-[#001e1d] rounded-full px-2 m-2"
                type="submit"
              >
                Agregar Ingrediente
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-row justify-around mt-10">
        <div className="flex flex-col items-center">
            <h2 className="text-[#e8e4e6] ">Comidas:</h2>
            <ul>
              {comidas.map((comida, index) => (
                <li key={index} className="text-[#e8e4e6] ">
                  {comida.nombre} - Ingredientes:{" "}
                  {comida.ingredientes.join(", ")} - Disponible:{" "}
                  {comida.disponible ? "Sí" : "No"}
                  <button
                    className="bg-[#f9bc60] text-[#001e1d] rounded-full px-2 m-2"
                    type="button"
                    onClick={handleEliminarComida}
                  >
                    Eliminar Comida
                  </button>
                </li>
              ))}
            </ul>

            {error && <p>{error}</p>}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-[#e8e4e6] ">Ingredientes Disponibles:</h2>
            <ul>
              {ingredientesDisponibles.map((ingrediente, index) => (
                <li key={index}>
                  {ingrediente}{" "}
                  <button
                    className="bg-[#f9bc60] text-[#001e1d] rounded-full px-2 m-2"
                    type="button"
                    onClick={() => handleEliminarIngredienteDisponible(index)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComidaForm;
