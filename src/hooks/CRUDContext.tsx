import { useState, createContext } from "react";

export interface CRUDContextType {
	setToastData: (msg: string, variant: "success" | "danger") => void;
	toggleToast: () => void;
	entityCreationToast: boolean;
	entityToastData: { msg: string; variant: "success" | "danger" };
}

const CRUDContext = createContext<CRUDContextType | undefined>(undefined);

export const CRUDContextProvider = ({ children }: any) => {
	const [entityCreationToast, setEntityCreationToast] = useState(false);
	const [entityToastData, setEntityToastData] = useState<{ msg: string; variant: "success" | "danger" }>({
		msg: "",
		variant: "danger",
	});

	const crudContext: CRUDContextType = {
		setToastData(msg, variant) {
			setEntityToastData({ msg, variant });
		},
		toggleToast() {
			setEntityCreationToast(!entityCreationToast);
		},
		entityCreationToast,
		entityToastData,
	};

	return <CRUDContext.Provider value={crudContext}>{children}</CRUDContext.Provider>;
};

export default CRUDContext;
