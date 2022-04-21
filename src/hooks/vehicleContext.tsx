import React, { createContext, ReactNode, useContext } from "react";

export interface IVehicle {
  categoria: string;
  titulo: string;
  idModelo: string;
  idMarca: string;
  idAno: string;
  tipo?: string;
  nome?: string | undefined;
  codigo?: number | undefined;
  Valor?: string | undefined;
  Marca?: string | undefined;
  Modelo?: string | undefined;
  AnoModelo?: string | undefined;
  Combustivel?: string | undefined;
  CodigoFipe?: string | undefined;
  MesReferencia?: string | undefined;
  TipoVeiculo?: number | undefined;
  SiglaCombustivel?: string | undefined;
}

interface VechicleContextData {
  vechicle?: IVehicle;
  replaceCase: (name: any) => any | undefined;
  toTitleCase: (name: any) => any | undefined;
  filter?: (item: any) => any;
}
interface VehicleProviderProps {
  children: ReactNode;
}

export const VehicleContext = createContext({} as VechicleContextData);

export function VehicleProvider({ children }: VehicleProviderProps) {
  const replaceCase = (name: any) => {
    if (name !== undefined && name !== "") {
      return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }
  };

  const toTitleCase = (name: any) => {
    if (name !== undefined && name !== "") {
      return name.replace(/\w\S*/g, function (name: any) {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
      });
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        replaceCase,
        toTitleCase,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicleAuth() {
  return useContext(VehicleContext);
}
