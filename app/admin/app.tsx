"use client"
import {Admin, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { CourseList } from "./course/list";
import { UnitList } from "./unit/list";
import { UnitCreate } from "./unit/create";
import { UnitEdit } from "./unit/edit";
import { LessonList } from "./lesson/list";
import { LessonCreate } from "./lesson/create";
import { LessonEdit } from "./lesson/edit";
import { ChallengeList } from "./challenge/list";
import { ChallangeCreate } from "./challenge/create";
import { ChallangeEdit } from "./challenge/edit";
import { ChallengeOptionList } from "./challengeOption/list";
import { ChallangeOptionCreate } from "./challengeOption/create";
import { ChallangeOptionEdit } from "./challengeOption/edit";


const dataProvider = simpleRestProvider("/api");
const App = ()=>{
    return (
        <Admin dataProvider={dataProvider}>
        <Resource 
        name = "courses"
        list={CourseList}
        create={CourseCreate}
        edit = {CourseEdit}
        recordRepresentation="title"
        />
        <Resource 
        name = "units"
        list={UnitList}
        create={UnitCreate}
        edit = {UnitEdit}
        recordRepresentation="title"
        />
        <Resource 
        name = "lessons"
        list={LessonList}
        create={LessonCreate}
        edit = {LessonEdit}
        recordRepresentation="title"
        />
         <Resource 
        name = "challenges"
        list={ChallengeList}
        create={ChallangeCreate}
        edit = {ChallangeEdit}
        recordRepresentation="question"
        />
        <Resource 
        name = "challengesOptions"
        list={ChallengeOptionList}
        create={ChallangeOptionCreate}
        edit = {ChallangeOptionEdit}
        recordRepresentation="text"
        />
    </Admin>
    );
};

export default App;