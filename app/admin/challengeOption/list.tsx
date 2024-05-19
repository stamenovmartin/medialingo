
import { SelectField ,Datagrid, List, NumberField, ReferenceField, TextField, BooleanField } from "react-admin";

export const ChallengeOptionList = () => {
    return (
        <List>
           <Datagrid rowClick="edit">
            <NumberField source="id"/>
            <TextField source="text"/>
            <BooleanField 
            source ="correct"
            />
            <ReferenceField source="challangeId" reference="challenges"/>
            <TextField source="imageSrc"/>
            </Datagrid> 
        </List>
    );
};