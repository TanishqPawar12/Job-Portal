import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage clerk user with database
export const clerkWebhooks = async (req, res) => {

    console.log("✅ Webhook hit:", req.headers["svix-id"], req.body?.type);
    
    try {
        console.log("✅ Webhook endpoint hit!"); // Debug 1
        console.log("🔐 Headers:", {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }); // Debug 2

        // Create a Svix instance with Clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify the webhook signature
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        console.log("✅ Webhook signature verified!"); // Debug 3

        // Getting data from request body
        const { data, type } = req.body;

        console.log("📦 Webhook Type:", type); // Debug 4
        console.log("👤 Data Received:", data); // Debug 5

        // Switch cases for different events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                };
                await User.create(userData);
                console.log("✅ User created in DB:", userData); // Debug 6
                res.json({});
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                };
                await User.findByIdAndUpdate(data.id, userData);
                console.log("🔄 User updated in DB:", data.id); // Debug 7
                res.json({});
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                console.log("❌ User deleted from DB:", data.id); // Debug 8
                res.json({});
                break;
            }

            default:
                console.log("⚠️ Unknown event type:", type); // Debug 9
                break;
        }

    } catch (error) {
        console.error("❌ Webhook Error:", error); // Debug 10
        res.json({ success: false, message: "Webhooks Error" });
    }
};
