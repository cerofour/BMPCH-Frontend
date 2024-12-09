import { createContext, useState, useContext, ReactNode } from "react";

interface Breadcrumb {
	name: string;
	path: string;
}

interface BreadcrumbContextProps {
	breadcrumbs: Breadcrumb[];
	setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextProps | undefined>(undefined);

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

	return <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>{children}</BreadcrumbContext.Provider>;
};

export const useBreadcrumb = () => {
	const context = useContext(BreadcrumbContext);
	if (!context) {
		throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
	}
	return context;
};
