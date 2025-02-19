import {supabase} from "./supabase";

export async function insertTeamsData(teamsData) {
    const { error } = await supabase
        .from("ranking")
        .upsert(teamsData, { onConflict: ["name"] });

    if (error) {
        console.error("Error inserting data into Supabase:", error);
        throw new Error("Failed to insert data into Supabase.");
    }
}
