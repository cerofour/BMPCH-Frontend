interface MyMenuButtonProps {
    onClick: () => void;
}

export default function MyMenuButton({onClick}: MyMenuButtonProps) {
    return(
        <>
            <img
				src="src\assets\Hamburger_icon.svg.png"
				alt="Boton menu"
				width={40}
				height={40}
                style={{ cursor: 'pointer' }}
                onClick={onClick}
			/>
        </>
    );
}