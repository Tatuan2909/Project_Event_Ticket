@echo off
echo ========================================
echo Starting Event Ticket System (HTTP MODE)
echo No certificate issues!
echo ========================================
echo.

cd Project_ApiTicketEvent

echo [1/5] Starting TicketEvent.Login (Port 5131)...
start "Login API" cmd /k "cd TicketEvent.Login && dotnet run --launch-profile http"
timeout /t 3 /nobreak >nul

echo [2/5] Starting TicketEvent.Admin (Port 5168)...
start "Admin API" cmd /k "cd TicketEvent.Admin && dotnet run --launch-profile http"
timeout /t 2 /nobreak >nul

echo [3/5] Starting TicketEvent.Attendee (Port 5231)...
start "Attendee API" cmd /k "cd TicketEvent.Attendee && dotnet run --launch-profile http"
timeout /t 2 /nobreak >nul

echo [4/5] Starting TicketEvent.Organizer (Port 5166)...
start "Organizer API" cmd /k "cd TicketEvent.Organizer && dotnet run --launch-profile http"
timeout /t 2 /nobreak >nul

echo [5/5] Starting TicketEvent.Gateway (Port 5124)...
start "Gateway API" cmd /k "cd TicketEvent.Gateway && dotnet run --launch-profile http"
timeout /t 3 /nobreak >nul

cd ..

echo.
echo ========================================
echo Configuring Frontend for HTTP...
echo ========================================
cd FE_TicketEvent\eventticket
copy /Y .env.http .env >nul 2>&1

echo Starting Frontend (Vite + React)...
start "Frontend" cmd /k "npm run dev"

cd ..\..

echo.
echo ========================================
echo All services started in HTTP mode!
echo ========================================
echo.
echo Backend APIs:
echo   - Login:     http://localhost:5131/swagger
echo   - Admin:     http://localhost:5168/swagger
echo   - Attendee:  http://localhost:5231/swagger
echo   - Organizer: http://localhost:5166/swagger
echo   - Gateway:   http://localhost:5124/swagger
echo.
echo Frontend:
echo   - Web App:   http://localhost:5173
echo.
echo Press any key to exit this window...
pause >nul
