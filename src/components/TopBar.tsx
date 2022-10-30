import "./ExploreContainer.css";
import styles from "./TopBar.module.css";
import {Avatar, useColorMode} from "@chakra-ui/react";

interface ContainerProps {
    fixed?: boolean
    children?: React.ReactNode;
}

const TopBar: React.FC<ContainerProps> = ({fixed, children}) => {
    const currentColorMode = useColorMode();
    return (
        <nav className={`${styles.toolbar} ${fixed ? styles.fixed : ""}`}>
            <img className={`${styles.logo} ${styles.left}`} src={currentColorMode.colorMode === "light" ? "assets/images/logo.png" : "assets/images/logo_white.png"} alt="Logo" width="1" height="1"/>
            <div className={styles.center}>{children}</div>
            <Avatar className={styles.avatar} onClick={()=>{}}/>
        </nav>
    );
};

export default TopBar;
