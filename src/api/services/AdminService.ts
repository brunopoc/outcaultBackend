import mongoose from "mongoose";

class AdminService {

  listAskPermission = async () => {
    try {
      const data: any = await mongoose
        .model("User")
        .find({ askPermission: { $ne: "default" }, blocked: false })
        .select("name nickname email type askPermission");

      if (!data) return { status: "errorOnListAsk" };

      return { status: "success", data };
    } catch (err) {
      return { status: "errorOnListAsk", data: err };
    }
  };

  listAllUsers = async () => {
    try {
      const data: any = await mongoose
        .model("User")
        .find()
        .select("name nickname email type blocked avatar createdAt");

      if (!data) return { status: "errorOnListUsers" };

      return { status: "success", data };
    } catch (err) {
      return { status: "errorOnListUsers", data: err };
    }
  };
}

module.exports = new AdminService();
