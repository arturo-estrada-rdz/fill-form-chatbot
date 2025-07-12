import app from './app';
import { environment } from './config/environment';

app.listen(environment.port || 3000, () => {
  console.log(`Server is running on port ${environment.port || 3000}`);
  console.log(`Environment: ${environment.environment}`);
  console.log(`API URL: ${environment.apiUrl}`);
});
