# Port Management System

This project includes an automatic port detection system to prevent "port already in use" errors during development.

## How It Works

The system automatically detects available ports and configures the development environment accordingly:

- **Main Dev Server (Netlify Dev)**: Default 3000, auto-detects if busy
- **Vite Dev Server**: Default 3001, auto-detects if busy  
- **Functions Server**: Default 8888, auto-detects if busy

## Available Commands

### Primary Development Command
```bash
npm run dev
```
This is the main command that:
1. Automatically finds available ports
2. Updates configuration files
3. Starts Netlify Dev with the correct ports
4. Shows you the URLs to access your app

### Alternative Commands
```bash
# Direct Netlify dev (may fail if ports are busy)
npm run dev:netlify

# Simple Express server (backend only)
npm run dev:simple

# Check available ports
npm run dev:port

# Setup port configuration
npm run setup:ports
```

## Environment Variables

The system uses these environment variables for port configuration:

- `DEV_PORT`: Main development server port (default: 3000)
- `VITE_PORT`: Vite development server port (default: 3001)
- `FUNCTIONS_PORT`: Netlify Functions server port (default: 8888)
- `PORT`: Fallback port variable

## Manual Port Configuration

You can manually specify ports by setting environment variables:

```bash
# Use specific ports
DEV_PORT=4000 VITE_PORT=4001 FUNCTIONS_PORT=4002 npm run dev

# Or create .env.local file
echo "DEV_PORT=4000" >> .env.local
echo "VITE_PORT=4001" >> .env.local
echo "FUNCTIONS_PORT=4002" >> .env.local
```

## Troubleshooting

### Port Still Busy Error
If you still get port errors:
1. Run `npm run setup:ports` to check available ports
2. Kill any processes using the ports: `lsof -ti:3000 | xargs kill -9`
3. Try `npm run dev` again

### Configuration Issues
- Check `netlify.toml` for port settings
- Verify `.env.local` has correct port variables
- Ensure `vite.config.ts` is using dynamic port detection

### Backend Services Not Working
- Verify functions are accessible at `http://localhost:{FUNCTIONS_PORT}/.netlify/functions/`
- Check the console output for the actual ports being used
- Test the health endpoint: `http://localhost:{FUNCTIONS_PORT}/health`

## Files Modified

- `scripts/find-available-port.cjs`: Port detection utility
- `scripts/start-dev-server.cjs`: Smart dev server starter
- `scripts/setup-ports.cjs`: Port configuration helper
- `netlify.toml`: Updated with environment variable support
- `vite.config.ts`: Dynamic port configuration
- `dev-server.cjs`: Enhanced with port detection
- `package.json`: Updated scripts

## How to Revert

If you need to revert to the original configuration:
1. Restore `netlify.toml.backup` (if it exists)
2. Use `npm run dev:netlify` instead of `npm run dev`
3. Remove the port detection scripts from the `scripts/` folder