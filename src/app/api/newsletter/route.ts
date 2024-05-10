import dbConnect from "@/lib/dbConnect";
import NewsletterModel from "@/models/Newsletter.model";
export async function POST(req: Request) {
  await dbConnect();
  try {
    const { email } = await req.json();
    console.log(email)
    if (!email) {
      return Response.json({
        success: false,
        message: "Please fill Your email",
      });
    }
    const existingUser = await NewsletterModel.findOne({ email });
    if (existingUser) {
      return Response.json({
        success: false,
        message: "Email is already exist",
      });
    }
    const newUser = new NewsletterModel({ email });
    const saveuser = await newUser.save();
    // console.log(saveuser)
    return Response.json({
      success: true,
      message: "Email submition success full",
    });
  } catch (error: any) {
    console.log("Error during saving user email for Newsletter", error);
    return Response.json(
      {
        success: false,
        message: "Error during saving user email for Newsletter",
      },
      { status: 500 }
    );
  }
}
