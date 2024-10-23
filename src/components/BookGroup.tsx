import { useQuery } from "@tanstack/react-query";
import { EditorialAPIObject, getAllEditorials } from "../api/api";

export default function BookGroup() {
	const {
		isLoading,
		isError,
		data: editorials,
		error,
	} = useQuery<EditorialAPIObject[], Error>({
		queryKey: ["getAllEditorials"],
		queryFn: getAllEditorials,
	});

	const wrap = (x: any) => <div className="main-container">{x}</div>;

	if (isLoading) return wrap(<h1>Loading books</h1>);

	if (isError) return wrap(<h1>Error loading books</h1>);

	return editorials?.map((editorial) => JSON.stringify(editorial));
}
