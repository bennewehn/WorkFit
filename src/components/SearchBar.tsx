import {Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {IonIcon} from "@ionic/react";
import {search} from "ionicons/icons";
import React from "react";

const SearchBar: React.FC = () => (
    <InputGroup>
        <Input placeholder="Search"/>
        <InputRightElement>
            <IonIcon icon={search}/>
        </InputRightElement>
    </InputGroup>
);
export default SearchBar;