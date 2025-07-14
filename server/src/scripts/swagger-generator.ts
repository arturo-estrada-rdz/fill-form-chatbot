import fs from 'fs';
import path from 'path';
import { swaggerDocs } from '../config/swagger';

try {
  const outputDir = path.join(__dirname, '../../generated');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'swagger.json');

  fs.writeFileSync(outputPath, JSON.stringify(swaggerDocs, null, 2), 'utf8');

  console.log(`Swagger documentation generated at ${outputPath}`);
} catch (error) {
  console.error('Error generating Swagger documentation:', error);
  process.exit(1);
}
