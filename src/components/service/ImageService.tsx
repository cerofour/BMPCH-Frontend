import { useQuery } from "@tanstack/react-query";

import { Card, Spinner } from "react-bootstrap";

import { fetchTextImage, fetchUserImage } from "../../api/api";
import { ReactIcons } from "../Icon";

export function FetchTextImage({ id }: any) {
	const {
		data: imageSrc,
		isLoading,
		isError,
	} = useQuery<any, Error>({
		queryFn: () => fetchTextImage(id), // Fetch function
		queryKey: ["fetchImage", id], // Query key includes the ID
	});

	// Handle loading and error states
	if (isLoading) return <p>Loading image...</p>;
	if (isError) return <p>Failed to load image.</p>;

	return imageSrc !== undefined ? (
		<img src={imageSrc} alt={`Fetched image ${id}`} style={{ maxWidth: "100%" }} />
	) : (
		<p>No image available.</p>
	);
}

export function FetchTextImageCard({ variant, id }: any) {
	const {
		data: imageSrc,
		isLoading,
		isError,
	} = useQuery<any, Error>({
		queryFn: () => fetchTextImage(id), // Fetch function
		queryKey: ["fetchImage", id], // Query key includes the ID
	});

	// Handle loading and error states
	if (isLoading) return <p>Loading image...</p>;
	if (isError) return <p>Failed to load image.</p>;

	return (
		<Card.Img
			variant={variant}
			width={300}
			height={300}
			src={imageSrc ? imageSrc : `https://placehold.co/300`}
		></Card.Img>
	);
}

export function FetchUserImage({ document }: any) {
	const {
		data: imageSrc,
		isLoading,
		isError,
	} = useQuery<any, Error>({
		queryFn: () => fetchUserImage(document), // Fetch function
		queryKey: ["fetchUserImage", document], // Query key includes the ID
	});

	// Handle loading and error states
	if (isLoading) return <p>Loading image...</p>;
	if (isError) return <p>Failed to load image.</p>;

	return imageSrc !== undefined ? (
		<img src={imageSrc} alt={`Fetched image ${document}`} className="customerImg" />
	) : (
		<p>No image available.</p>
	);
}

interface FetchUserImageProps {
	mapFn: (x: any) => JSX.Element;
	document: string;
}

export function FetchUserImageTest({ document, mapFn }: FetchUserImageProps) {
	const { data, isLoading, isError } = useQuery<any, Error>({
		queryFn: () => fetchUserImage(document), // Fetch function
		queryKey: ["fetchUserImage", document], // Query key includes the ID
	});

	if (isLoading) return <Spinner animation="border" role="status"></Spinner>;
	else if (isError) return <ReactIcons library="AntIcons" iconName="AiOutlineClose" size={24} />;

	return mapFn(data);
}

export function FetchUserImageCard({ variant, document }: any) {
	const {
		data: imageSrc,
		isLoading,
		isError,
	} = useQuery<any, Error>({
		queryFn: () => fetchUserImage(document), // Fetch function
		queryKey: ["fetchImage", document], // Query key includes the ID
	});

	// Handle loading and error states
	if (isLoading) return <p>Loading image...</p>;
	if (isError) return <p>Failed to load image.</p>;

	return (
		<Card.Img
			variant={variant}
			width={300}
			height={300}
			src={imageSrc ? imageSrc : `https://placehold.co/300`}
		></Card.Img>
	);
}
