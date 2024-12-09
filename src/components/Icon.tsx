import * as BootstrapIcons_ from "react-bootstrap-icons";

// Here you have to import the react icon pack that you are going to use.
import * as GoIcons from "react-icons/go";
import * as IoIcons from "react-icons/io";
import * as AntIcons from "react-icons/ai";
import * as MaterialIcons from "react-icons/md";

{
	/*Bootstrap icons*/
}
interface BootstrapIconsProps extends BootstrapIcons_.IconProps {
	// Cannot use "name" as it is a valid SVG attribute
	// "iconName", "filename", "icon" will do it instead
	iconName: keyof typeof BootstrapIcons_;
}

export const BootstrapIcons = ({ iconName, ...props }: BootstrapIconsProps) => {
	const BI = BootstrapIcons_[iconName];
	return <BI {...props} />;
};

{
	/*Also include the react icon pack in the IconLibraries type,
  likewise in the IconsLibraries constant*/
}

const IconsLibraries = {
	GoIcons: GoIcons,
	IoIcons: IoIcons,
	AntIcons: AntIcons,
	MaterialIcons: MaterialIcons,
};

interface IconProps {
	library: string;
	iconName: string;
	children?: React.ReactNode;
	size?: string | number;
	color?: string;
	title?: string;
}

export const ReactIcons = ({ library, iconName, ...props }: IconProps) => {
	const IconComponent = (IconsLibraries as Record<string, any>)[library][iconName];
	return <IconComponent {...props} />;
};
