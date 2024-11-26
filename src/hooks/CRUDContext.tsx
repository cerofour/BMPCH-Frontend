import { createContext } from "react";

export interface CRUDContextType {
	userCreationSuccess: () => void;
	userCreationFailure: (error: any) => void;
}

const CRUDContext = createContext<CRUDContextType | null>(null);

export default CRUDContext;
