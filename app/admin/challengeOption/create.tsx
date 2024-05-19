import { SelectInput,Create,BooleanInput, Datagrid, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallangeOptionCreate = () => {
    return (
        <Create>
           <SimpleForm >
            <TextInput source="text" 
            validate={required()} 
            label = "Text"/>
            <BooleanInput 
            source = "correct"
            label="Correct option"
            />
              <ReferenceInput 
              source = "challangeId"
              reference="challenges"
              />
              <TextInput 
              source = "imageSrc"
              label="Image URL"
              />
            </SimpleForm> 
        </Create>
    );
};