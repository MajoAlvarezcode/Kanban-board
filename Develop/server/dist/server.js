import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4000;
// Serves static files in the entire client's dist folder
app.use(express.static(('../client/dist')));
app.use(express.json());
app.use('/', routes);
if (process.env.NODE_ENV === 'production') {
    app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}
;
sequelize.sync()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('Failed to sync the database:', err);
});
