import {Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {IonIcon} from "@ionic/react";
import {search} from "ionicons/icons";
import React from "react";

interface Props {
    onInput: (text: string) => void;
};
const SearchBar: React.FC<Props> = ({onInput}) => (
    <InputGroup>
        <Input placeholder="Search" onInput={(ev) => onInput((ev.target as HTMLInputElement).value)}/>
        <InputRightElement>
            <IonIcon icon={search}/>
        </InputRightElement>
    </InputGroup>
);
export default SearchBar;