const app = require("./app");
var port = process.env.PORT || 3006;

app.listen(port, () => console.log(`server starting on port ${port}`));
