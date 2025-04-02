import {supabase} from "./supabase";

export async function insertTeamsData(teamsData, tableName) {
    
    const conflictColumn = tableName === "ranking" ? "name" : "teamName";

    const { error } = await supabase
        .from(tableName)
        .upsert(teamsData, { onConflict: [conflictColumn] });
        

    if (error) {
        console.error("Error inserting data into Supabase:", error);
        throw new Error("Failed to insert data into Supabase.");
    }
}
