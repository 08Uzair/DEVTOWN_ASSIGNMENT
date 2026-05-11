import mongoose from "mongoose";
const URI =
  "mongodb+srv://taskDB:taskDB@cluster0.bdgpeuq.mongodb.net/?appName=Cluster0"

export const dataBaseConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DATA BASE IS CONNECTED ");
  } catch (error) {}
};
