import { SelectInput,Create, Datagrid, NumberInput, ReferenceInput, SimpleForm, TextInput, required, Edit } from "react-admin";

export const ChallangeEdit = () => {
    return (
        <Edit>
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
        </Edit>
    );
};