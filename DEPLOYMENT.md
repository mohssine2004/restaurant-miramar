# Deployment Guide - Miramar Restaurant

## Backend Deployment (Railway)

### 1. Deploy to Railway
1. Connect your GitHub repository to Railway
2. Select the `backend` folder as the root directory
3. Railway will auto-detect Node.js and install dependencies

### 2. Environment Variables
Add these environment variables in Railway dashboard:

```
DATABASE_URL=your_neon_postgresql_url
PORT=5000
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### 3. Get Your Railway URL
After deployment, Railway will give you a URL like:
`https://your-app-name.railway.app`

**Save this URL - you'll need it for frontend deployment!**

---

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend`
3. Vercel will auto-detect Vite

### 2. Environment Variables
Add this environment variable in Vercel dashboard:

```
VITE_API_URL=https://your-railway-app.railway.app
```

**IMPORTANT:** Replace `your-railway-app.railway.app` with your actual Railway backend URL from step above!

### 3. Redeploy
After adding the environment variable, trigger a new deployment in Vercel.

---

## Troubleshooting

### Error: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

**Cause:** Frontend is trying to fetch from wrong API URL or API is not responding.

**Solutions:**
1. Check browser console for the API URL being used (we added debug logs)
2. Verify `VITE_API_URL` is set correctly in Vercel
3. Test your Railway backend directly: `https://your-railway-app.railway.app/api/categories`
4. Make sure Railway backend is running (check Railway logs)
5. Redeploy Vercel after setting environment variables

### CORS Errors

**Cause:** Backend is blocking requests from your Vercel domain.

**Solution:**
1. Add `FRONTEND_URL` environment variable in Railway
2. Set it to your Vercel URL: `https://your-app.vercel.app`
3. Redeploy Railway backend

### Database Connection Issues

**Cause:** Railway can't connect to Neon database.

**Solution:**
1. Verify `DATABASE_URL` in Railway matches your Neon connection string
2. Check Neon dashboard to ensure database is active
3. Check Railway logs for connection errors

---

## Testing Deployment

### 1. Test Backend
Visit: `https://your-railway-app.railway.app/api/categories`

You should see JSON response with categories.

### 2. Test Frontend
Visit your Vercel URL and check browser console for:
- API URL being used
- Any error messages
- Network tab to see actual requests

### 3. Check Logs
- **Railway:** Check deployment logs and runtime logs
- **Vercel:** Check function logs and build logs
- **Browser:** Check console and network tab

---

## Quick Checklist

- [ ] Backend deployed to Railway
- [ ] `DATABASE_URL` set in Railway
- [ ] `FRONTEND_URL` set in Railway (your Vercel URL)
- [ ] Railway backend URL obtained
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_URL` set in Vercel (your Railway URL)
- [ ] Vercel redeployed after setting env var
- [ ] Backend API tested directly
- [ ] Frontend tested in browser
- [ ] No CORS errors in console
