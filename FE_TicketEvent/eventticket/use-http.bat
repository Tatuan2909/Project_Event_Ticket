@echo off
echo Switching to HTTP mode (no certificate issues)...
copy /Y .env.http .env
echo.
echo Done! Now restart frontend:
echo   npm run dev
echo.
echo Backend will run on HTTP ports:
echo   - Login:     http://localhost:5131
echo   - Attendee:  http://localhost:5231
echo   - Organizer: http://localhost:5166
echo   - Admin:     http://localhost:5168
pause
