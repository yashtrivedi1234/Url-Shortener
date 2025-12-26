import { Url } from "../model/Url.js";
import shortid from "shortid";

export const shortUrl = async (req, res) => {
	const longUrl = req.body.longUrl;
	const shortCode = shortid.generate();
	// Use dynamic base URL for deployment
	const baseUrl =
		process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
	const shortUrl = `${baseUrl}/${shortCode}`;

	//    save to database
	const newUrl = new Url({ shortCode, longUrl });
	await newUrl.save();

	console.log("short saved = ", newUrl);
	res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
	const shortCode = req.params.shortCode;

	// find on database
	const originalUrl = await Url.findOne({ shortCode });

	if (originalUrl) {
		// Render the view and pass the longUrl
		return res.render("index.ejs", {
			longUrl: originalUrl.longUrl,
			error: null,
		});
	} else {
		// Render the view with an error message
		return res.render("index.ejs", {
			longUrl: null,
			error: "Invalid shortcode",
		});
	}
};
