export default interface TableProps {
	reload?: boolean;
	setReload?: (arg0: boolean) => void;
	filterFn?: (item: string) => boolean;
}
