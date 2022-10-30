import "./ExploreContainer.css";
import styles from "./TopBar.module.css";
import {Avatar, Button, IconButton, useColorMode} from "@chakra-ui/react";
import {useHistory} from "react-router"

interface ContainerProps {
    fixed?: boolean
    children?: React.ReactNode;
}

const TopBar: React.FC<ContainerProps> = ({fixed, children}) => {

    const history = useHistory();

    const currentColorMode = useColorMode();
    return (
        <nav className={`${styles.toolbar} ${fixed ? styles.fixed : ""}`}>
            <img className={`${styles.logo} ${styles.left}`} src={currentColorMode.colorMode === "light" ? "assets/images/logo.png" : "assets/images/logo_white.png"} alt="Logo" width="1" height="1"/>
            <div className={styles.center}>{children}</div>
            <Avatar className={styles.avatar} onClick={()=>{history.push("/app/settings")}}/>
        </nav>
    );
};

export default TopBar;
