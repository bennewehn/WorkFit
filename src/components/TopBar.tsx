import "./ExploreContainer.css";
import styles from "./TopBar.module.css";
import {Avatar} from "@chakra-ui/react";

interface ContainerProps {
    children?: React.ReactNode;
}

const TopBar: React.FC<ContainerProps> = ({children}) => {
    return (
        <div className={styles.toolbar}>
            <img className={`${styles.logo} ${styles.left}`} src="assets/images/logo.png" alt="Logo" width="1" height="1"/>
            <div className={styles.center}>{children}</div>
            <Avatar className={styles.right}/>
        </div>
    );
};

export default TopBar;
