import express from "express";
import BlogStatus from "../models/blog.js";

const router = express.Router();

// Get all blog statuses
router.get("/statuses", async (req, res) => {
  try {
    const statuses = await BlogStatus.find({});
    res.json(statuses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch statuses" });
  }
});

// Update status, author, or custom date
router.patch("/:devId/status", async (req, res) => {
  try {
    const devIdNum = Number(req.params.devId);
    const { status, customAuthor, customDate } = req.body;

    const updateFields = {};
    if (status !== undefined) {
      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      updateFields.status = status;
    }
    if (customAuthor !== undefined) updateFields.customAuthor = customAuthor;
    if (customDate !== undefined) updateFields.customDate = customDate;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updated = await BlogStatus.findOneAndUpdate(
      { devId: devIdNum },
      { $set: updateFields },
      { upsert: true, new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "devId not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update record" });
  }
});

// Get approved blog IDs
router.get("/approved-ids", async (req, res) => {
  try {
    const approvedBlogs = await BlogStatus.find({ status: "approved" }).select(
      "devId customAuthor customDate createdAt"
    );
    res.json(approvedBlogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch approved IDs" });
  }
});

export default router;
