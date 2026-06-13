export default function errorHandler(err, req, res, next) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong . please try again later" });

}