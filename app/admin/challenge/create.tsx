import { SelectInput,Create, Datagrid, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallangeCreate = () => {
    return (
        <Create>
           <SimpleForm >
            <TextInput source="question" 
            validate={required()} 
            label = "Question"/>
            <SelectInput 
            source = "type"
            choices={[
                {
                  id: "SELECT",
                  name: "SELECT"
                } , 
                {
                  id: "ASSIST",
                  name: "ASSIST"
                } , 
              ]}
              validate={required()} 
            />
              <ReferenceInput 
              source = "lessonId"
              reference="lessons"
              />
              <NumberInput 
              source = "order"
              validate={[required()]}
              label="order"
              />
            </SimpleForm> 
        </Create>
    );
};