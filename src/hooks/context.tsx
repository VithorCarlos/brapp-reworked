import React, 
{ 
    createContext, 
    ReactNode, 
    useContext,
    useState, 
} from 'react';

export interface IVehicle {
    tipo: string;
    nome: string | undefined;
    codigo: number | undefined;
    Valor: string | undefined;
    Marca: string | undefined;
    Modelo: string | undefined;
    AnoModelo: number | undefined;
    Combustivel: string | undefined;
    CodigoFipe: string | undefined;
    MesReferencia: string | undefined;
    TipoVeiculo: number | undefined
    SiglaCombustivel: string | undefined;
    replaceCase: (name: string) => string;
    toTitleCase: (name: string) => string;
}

interface VehicleProviderProps {
    children: ReactNode;
}

export const VehicleContext = createContext({} as IVehicle);


export function VehicleProvider({children}: VehicleProviderProps) { 
    function replaceCase(name: string) {
        if (name !== undefined){
            return name.toLowerCase() 
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
        }
      }

      function toTitleCase(name: string) {
        if (name !== undefined){
            return name.replace(
                /\w\S*/g,
                function(name) {
                  return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
                }
              );
        }
        
      }

    return (
        <VehicleContext.Provider 
            value={{
                replaceCase,
                toTitleCase      
            }}
        >
            {children}
        </VehicleContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(VehicleContext);
    return context;
}
