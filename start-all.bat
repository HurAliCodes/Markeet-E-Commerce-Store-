@echo off
title Starting Full Stack Project

echo Starting Backend...
start "Backend" cmd /k "cd /d "%~dp0backend" && npm run server"

echo Starting Frontend...
start "Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo Starting Admin...
start "Admin" cmd /k "cd /d "%~dp0admin" && npm run dev"

exit