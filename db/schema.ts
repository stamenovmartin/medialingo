import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable,serial,text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});
export const coursesRelations=relations(courses,({many})=>({
    userProgress:many(userProgress),
    units:many(units)

}));
export const units=pgTable("units",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    description:text("description").notNull(),
    courseId:integer("course_id").references(()=>courses.id,{onDelete:"cascade"}).notNull(),
    ordder:integer("order").notNull()

});
export const unitsRelations=relations(units,({many,one})=>({
    course:one(courses,{
        fields:[units.courseId],
        references:[courses.id],
    }),
    lesson:many(lessons)
}));
export const lessons=pgTable("lessons",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    unitId:integer("unit_id").references(()=>units.id,{onDelete:
        "cascade"
    }).notNull(),
    order:integer("order").notNull(),
});
export const lessonsRelations=relations(lessons,({one,many})=>({
    unit:one(units,{
        fields:[lessons.unitId],
        references:[units.id],
    }),
    challanges:many(challanges),
}));
export const challangesEnum=pgEnum("type",["SELECT","ASSIST"]); //if we want to add diferent type of challlange here

export const challanges=pgTable("challanges",{
    id:serial("id").primaryKey(),
    lessonId:integer("lesson_id").references(()=>lessons.id,{onDelete:
        "cascade"}).notNull(),
    type:challangesEnum("type").notNull(),
    question:text("question").notNull(),
    order:integer("order").notNull(),
    
});
export const challangesRelations=relations(challanges,({one,many})=>({
    lesson:one(lessons,{
        fields:[challanges.lessonId],
        references:[lessons.id],
    }),
    challangeOptions:many(challangeOptions),
    challangeProgress:many(challangeProgress),
}));

export const challangeOptions=pgTable("challange_options",{
    id:serial("id").primaryKey(),
    challangeId:integer("challange_id").references(()=>challanges.id,{onDelete:
        "cascade"}).notNull(),
    text:text("text").notNull(),
    correct:boolean("correct").notNull(),
    imageSrc:text("image_src"),
    audioSrc:text("audios_src"),
});
export const challangeOptionsRelations=relations(challangeOptions,({one})=>({
    challange:one(challanges,{
        fields:[challangeOptions.challangeId],
        references:[challanges.id],
    }),
}));

export const challangeProgress=pgTable("challange_progress",{
    id:serial("id").primaryKey(),
    userId:integer("user_id").notNull(),
    challangeId:integer("challange_id").references(()=>challanges.id,{
        onDelete:"cascade"}).notNull(),
   completed:boolean("completed").notNull().default(false),
});
export const challangeProgressRelations=relations(challangeProgress,({one})=>({
    challange:one(challanges,{
        fields:[challangeProgress.challangeId],
        references:[challanges.id],
    }),
}));

export const userProgress=pgTable("user_progress",{
    userId:text("user_id").primaryKey(),
    userName:text("user_name").notNull().default("User"),
    userImageSrc:text("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId:integer("active_course_id").references(()=>courses.
    id,{onDelete:"cascade"}),
    hearts:integer("hearts").notNull().default(5),
    points:integer("points").notNull().default(0)
});
export const userProgressRelations=relations(userProgress,({one})=>
({
    activeCourse:one(courses,{
        fields:[userProgress.activeCourseId],
        references:[courses.id],
    }),
}))