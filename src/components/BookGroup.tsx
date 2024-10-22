// import BookCard from "./BookCard";

import { useQuery } from "@tanstack/react-query";
import BookCard from "./BookCard";

import { Row, Col } from "react-bootstrap";

/*
import { fetchBookData, BookAPIObject } from "../api/api";

export default function BookGroup() {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ["books"],
		queryFn: fetchBookData,
	});

	if (isLoading) return <div>Loading books</div>;

	if (isError) return <div>An unexpected error ocurred: {error.message}</div>;

	const bookCards = data.map((book: BookAPIObject) => (
		<Col key={book.id}>
			<BookCard
				id={book.id}
				author="Diego L"
				publicationDate={book.publication_date}
				title={book.title}
			></BookCard>
		</Col>
	));

	return (
		<div className="d-flex justify-content-flex-end book-group-container">
			<Row xs="1" md="2" lg="3" xl="3" xxl="4" className="g-4">
				{bookCards}
			</Row>
		</div>
	);
}

*/
